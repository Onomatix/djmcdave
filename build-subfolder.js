// build-subfolder.js
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildForSubfolder() {
  try {
    // Build with base path set for subfolder
    await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
      base: '/djmcdave/',
      mode: 'production',
      build: {
        outDir: 'dist-subfolder',
        emptyOutDir: true
      }
    });

    // Fix asset paths inside HTML and JS files
    const { replaceInFile } = await import('replace-in-file');
    const results = await replaceInFile({
      files: ['dist-subfolder/**/*.html', 'dist-subfolder/**/*.js'],
      from: /\/src\/assets\//g,
      to: '/djmcdave/assets/',
    });
    console.log('✅ Replaced asset paths:', results.filter(r => r.hasChanged).map(r => r.file));

    // Add .htaccess file for Apache routing in subfolder
    const htaccessContent = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /djmcdave/
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>`;

    await writeFile('dist-subfolder/.htaccess', htaccessContent.trim());
    console.log('✅ .htaccess file added to dist-subfolder');

    console.log('🎉 Subfolder build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildForSubfolder();