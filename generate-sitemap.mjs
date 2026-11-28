import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if([".git","node_modules",".shots"].includes(e.name))return[];
    const p=path.join(dir,e.name); return e.isDirectory()?walk(p):[p];
  });
}
const urls=[];
for(const file of walk(root).filter(f=>f.endsWith(".html")&&!/^google.*\.html$/i.test(path.basename(f))&&path.basename(f)!=="404.html")){
  const s=fs.readFileSync(file,"utf8");
  const m=s.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if(m) urls.push(m[1]);
}
urls.sort((a,b)=>{
  const rank=u=>u.endsWith("/mikkyou-guide/")?0:u.includes("/articles/")?2:1;
  return rank(a)-rank(b)||a.localeCompare(b,"ja");
});
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+u.replaceAll("&","&amp;")+'</loc></url>').join("\n")+'\n</urlset>\n';
fs.writeFileSync("sitemap.xml",xml);
console.log("Generated sitemap with "+urls.length+" URLs.");
