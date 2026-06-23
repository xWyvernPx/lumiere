const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');

const replacements = [
  { p: /text-\[\#121212\]/g, r: 'text-[var(--foreground)]' },
  { p: /bg-\[\#121212\]/g, r: 'bg-[var(--primary)]' },
  { p: /border-\[\#121212\]/g, r: 'border-[var(--border)]' },
  { p: /text-\[\#333333\]/g, r: 'text-[var(--foreground)] opacity-80' },
  { p: /text-\[\#567b95\]/g, r: 'text-[var(--accent)]' },
  { p: /bg-\[\#567b95\]/g, r: 'bg-[var(--accent)]' },
  { p: /border-\[\#e2e2e2\]/g, r: 'border-[var(--border)] border-opacity-20' },
  { p: /bg-\[\#fcfcfc\]/g, r: 'bg-[var(--background)]' },
  { p: /bg-\[\#f4f4f4\]/g, r: 'bg-[var(--code-bg)]' },
  { p: /text-white/g, r: 'text-[var(--background)] !important' },
  { p: /stroke-\[\#121212\]/g, r: 'stroke-[var(--foreground)]' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (let f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      replacements.forEach(({ p, r }) => {
        content = content.replace(p, r);
      });
      fs.writeFileSync(fullPath, content);
      console.log('Processed', fullPath);
    }
  }
}

processDir(srcDir);
