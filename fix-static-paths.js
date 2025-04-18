// fix-static-paths.js
const replace = require('replace-in-file');

const options = {
  files: ['build/**/*.html', 'build/**/*.js', 'dist/**/*.html', 'dist/**/*.js'],
  from: /\/public\/lovable-uploads\//g,
  to: '/lovable-uploads/',
};

(async () => {
  try {
    const results = await replace(options);
    console.log('Replaced paths in files:', results.filter(r => r.hasChanged).map(r => r.file));
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
