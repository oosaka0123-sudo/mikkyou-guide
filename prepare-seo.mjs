import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("articles");
const SITE = "https://oosaka0123-sudo.github.io/mikkyou-guide";
const MARKER = 'data-mikkyou-structured="1"';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function decodeBasic(s) {
  return s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

function extract(html, re, fallback = "") {
  const m = html.match(re);
  return m ? decodeBasic(m[1].trim()) : fallback;
}

if (!fs.existsSync(ROOT)) process.exit(0);

let changed = 0;
for (const file of walk(ROOT).filter((f) => f.endsWith(path.sep + "index.html"))) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(MARKER)) continue;

  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const headline = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i, title.replace(/\s*[|｜]\s*密教図譜.*$/, ""));
  const description = extract(html, /<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\']/i);
  const canonical = extract(html, /<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']/i);
  if (!canonical || !headline) continue;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": canonical + "#article",
        headline,
        description,
        inLanguage: "ja",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: { "@type": "Organization", name: "密教図譜", url: SITE + "/" },
        publisher: { "@type": "Organization", name: "密教図譜", url: SITE + "/" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": canonical + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "密教図譜", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "深掘り記事", item: SITE + "/articles/" },
          { "@type": "ListItem", position: 3, name: headline, item: canonical }
        ]
      }
    ]
  };

  const json = JSON.stringify(graph).replaceAll("<", "\\u003c");
  const block = '<script type="application/ld+json" ' + MARKER + '>' + json + '</script>';
  html = html.replace("</head>", block + "</head>");
  fs.writeFileSync(file, html);
  changed++;
}

console.log("Structured data injected into " + changed + " article pages.");
