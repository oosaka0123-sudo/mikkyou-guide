import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "/mikkyou-guide";
const site = "https://oosaka0123-sudo.github.io/mikkyou-guide";

function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if ([".git","node_modules",".shots"].includes(e.name)) return [];
    const p=path.join(dir,e.name);
    return e.isDirectory()?walk(p):[p];
  });
}
const htmlFiles=walk(root).filter(f=>f.endsWith(".html")&&!/^google.*\.html$/i.test(path.basename(f)));
const errors=[], warnings=[], canonicals=new Map(), publicUrls=new Set();

function get(s,re){const m=s.match(re);return m?m[1].trim():"";}
function rel(file){return path.relative(root,file).replaceAll("\\","/");}

for(const file of htmlFiles){
  const s=fs.readFileSync(file,"utf8");
  const name=rel(file);
  const title=get(s,/<title>([\s\S]*?)<\/title>/i);
  const desc=get(s,/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical=get(s,/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1=(s.match(/<h1\b/gi)||[]).length;
  if(!s.includes('<meta charset="utf-8">')) errors.push(name+": missing charset");
  if(!title) errors.push(name+": missing title");
  if(!desc) errors.push(name+": missing description");
  if(!canonical) errors.push(name+": missing canonical");
  if(h1!==1) errors.push(name+": h1 count "+h1);
  if(!s.includes("<main")||!s.includes("</main>")) errors.push(name+": invalid main");
  if(s.includes("\uFFFD")) errors.push(name+": replacement character");
  if(/<meta property="og:title"[^>]*<\/meta>/i.test(s)) errors.push(name+": malformed og:title");
  if(canonical){
    if(!canonical.startsWith(site+"/")) errors.push(name+": canonical outside site "+canonical);
    if(canonicals.has(canonical)) errors.push(name+": duplicate canonical with "+canonicals.get(canonical));
    canonicals.set(canonical,name); if(name!=="404.html") publicUrls.add(canonical);
  }
  for(const m of s.matchAll(/href=["']([^"']+)["']/g)){
    const h=m[1];
    if(!h.startsWith(base)||h.includes("#")||/\.(svg|png|webmanifest|css|js|txt|xml)$/.test(h)) continue;
    const clean=h.split("?")[0];
    const p=clean.slice(base.length).replace(/^\//,"").replace(/\/$/,"");
    const target=p?path.join(root,p,"index.html"):path.join(root,"index.html");
    if(!fs.existsSync(target)) errors.push(name+" -> broken "+h);
  }
  for(const m of s.matchAll(/<a\b([^>]*target=["']_blank["'][^>]*)>/gi)){
    if(!/rel=["'][^"']*noopener/.test(m[1])) warnings.push(name+": target=_blank without noopener");
  }
  if(desc.length<50) warnings.push(name+": short meta description ("+desc.length+")");
  if(desc.length>180) warnings.push(name+": long meta description ("+desc.length+")");
  if(/^articles\/[^/]+\/index\.html$/.test(name)){
    if(!s.includes("<h2>参照</h2>")) errors.push(name+": missing references section");
    if(!s.includes("関連して読む")) errors.push(name+": missing related-reading section");
    if(!s.includes('data-mikkyou-structured="1"')) errors.push(name+": missing Article structured data");
  }
  if(name!=="404.html" && !/^articles\/[^/]+\/index\.html$/.test(name) && !s.includes('data-mikkyou-page-structured="1"')){
    errors.push(name+": missing page structured data");
  }
}

const sitemapPath=path.join(root,"sitemap.xml");
if(fs.existsSync(sitemapPath)){
  const xml=fs.readFileSync(sitemapPath,"utf8");
  const locs=new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]));
  for(const u of publicUrls) if(!locs.has(u)) errors.push("sitemap missing "+u);
  for(const u of locs) if(!publicUrls.has(u)) errors.push("sitemap orphan "+u);
}else errors.push("missing sitemap.xml");

console.log("HTML",htmlFiles.length,"canonicals",canonicals.size,"errors",errors.length,"warnings",warnings.length);
if(warnings.length) console.log("Warnings:\n"+warnings.join("\n"));
if(errors.length){console.error("Errors:\n"+errors.join("\n"));process.exit(1);}
