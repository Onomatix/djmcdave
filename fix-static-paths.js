// fix-static-paths.js
const replace = require('replace-in-file');

const options = {
  // Fix assets paths
  files: ['build/**/*.html', 'build/**/*.js', 'dist/**/*.html', 'dist/**/*.js'],
  from: /\/src\/assets\//g,
  to: '/assets/',
};

(async () => {
  try {
    const results = await replace(options);
    console.log('Replaced paths in files:', 
      results.filter(r => r.hasChanged).map(r => r.file));
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
