const replaceInFile = await import('replace-in-file');

const options = {
  files: ['dist-subfolder/**/*.html', 'dist-subfolder/**/*.js'],
  from: /\/src\/assets\//g,
  to: '/djmcdave/assets/',
};

try {
  const results = await replaceInFile.replaceInFile(options);
  console.log(
    'Replaced paths in subfolder build:',
    results.filter(r => r.hasChanged).map(r => r.file)
  );
} catch (error) {
  console.error('Error occurred:', error);
}