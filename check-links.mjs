import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),base='/mikkyou-guide';
const html=[];
const excluded=new Set(['.git','.github','.shots','assets','node_modules','docs']);
function walk(dir){
  for(const d of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,d.name);
    if(d.isDirectory()&&!excluded.has(d.name)&&!d.name.startsWith('.')) walk(p);
    if(d.isFile()&&d.name.endsWith('.html')&&!/^google.*\.html$/i.test(d.name))html.push(p);
  }
}
walk(root);
const broken=[],invalid=[];
for(const file of html){
  const s=fs.readFileSync(file,'utf8');
  if(!s.includes('<meta charset="utf-8">')||!s.includes('</title>')||!s.includes('<main')||!s.includes('</main>')||!s.includes('密教図譜')||s.includes('\uFFFD'))invalid.push(path.relative(root,file));
  for(const m of s.matchAll(/href="([^"]+)"/g)){
    const h=m[1];
    if(!h.startsWith(base+'/')&&h!==base)continue;
    const rel=h.slice(base.length).split(/[?#]/)[0].replace(/^\//,'');
    const target=rel.endsWith('/')||!path.extname(rel)?path.join(root,rel,'index.html'):path.join(root,rel);
    if(!target.startsWith(root+path.sep)||!fs.existsSync(target))broken.push(path.relative(root,file)+' -> '+h);
  }
}
console.log('HTML '+html.length+', broken '+broken.length+', invalid '+invalid.length);
if(broken.length)console.log(broken.join('\n'));
if(invalid.length)console.log('Invalid:',invalid.join(', '));
if(broken.length||invalid.length)process.exit(1);
