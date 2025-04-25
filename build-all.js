// build-all.js
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { writeFile } from 'fs/promises';
import { replaceInFile } from 'replace-in-file';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runBuild(config) {
  console.log(`\n🔧 Building for: ${config.label}`);
  await build({
    configFile: resolve(__dirname, 'vite.config.ts'),
    base: config.base,
    mode: 'production',
    build: {
      outDir: config.outDir,
      emptyOutDir: true,
    }
  });

  if (config.postReplace) {
    const results = await replaceInFile(config.postReplace);
    console.log('✅ Replaced paths:', results.filter(r => r.hasChanged).map(r => r.file));
  }

  if (config.htaccess) {
    await writeFile(resolve(config.outDir, '.htaccess'), config.htaccess.trim());
    console.log('✅ .htaccess added for:', config.label);
  }

  console.log(`🎉 ${config.label} build completed!`);
}

const builds = [
  {
    label: 'Root Domain',
    base: '/',
    outDir: 'dist-root'
  },
  {
    label: 'Subdomain',
    base: '/',
    outDir: 'dist-subdomain'
  },
  {
    label: 'Vercel',
    base: '/',
    outDir: 'dist-vercel'
  },
  {
    label: 'Subfolder',
    base: '/djmcdave/',
    outDir: 'dist-subfolder',
    postReplace: {
      files: ['dist-subfolder/**/*.html', 'dist-subfolder/**/*.js'],
      from: /\/src\/assets\//g,
      to: '/djmcdave/assets/',
    },
    htaccess: `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /djmcdave/
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>`
  }
];

(async () => {
  for (const config of builds) {
    await runBuild(config);
  }
})();
