import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if([".git","node_modules",".shots"].includes(e.name))return[];const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]})}
const nav='<nav id="nav" class="nav" aria-label="主要ナビゲーション"><a href="/mikkyou-guide/history/">歴史</a><a href="/mikkyou-guide/shingon/">真言密教</a><a href="/mikkyou-guide/tendai/">天台密教</a><a href="/mikkyou-guide/mandala/">曼荼羅</a><a href="/mikkyou-guide/concepts/">重要概念</a><a href="/mikkyou-guide/glossary/">用語辞典</a></nav>';
let changed=0;
for(const file of walk(root).filter(f=>f.endsWith(".html")&&!/^google.*\.html$/i.test(path.basename(f)))){
  let s=fs.readFileSync(file,"utf8");
  const before=s;
  s=s.replace(/<nav id="nav" class="nav"(?: aria-label="[^"]*")?>[\s\S]*?<\/nav>/,nav);
  if(s!==before){fs.writeFileSync(file,s);changed++;}
}
console.log("Normalized navigation on "+changed+" pages.");
