var fs = require('fs');
var rimraf = require('rimraf');

function command(grunt, cmd, args) {
  return new Promise(resolve => {
    grunt.util.spawn({
      cmd: cmd,
      args: args
    }, (e, r) => resolve({ error: e, result: r}));
  });
}

function removeDirectory(grunt, dir) {
  return new Promise(resolve => {
    rimraf(dir, function () {
      grunt.log.writeln('Removed directory: ' + dir);
      resolve();
    });
  });
}

function cloneRepo(grunt, repoUrl, dir) {
  return new Promise(resolve => {
    command(grunt, 'git', ['clone',  repoUrl, dir])
      .then(cmd => {
        String(cmd.result);

        if (fs.existsSync(dir)){
          grunt.log.writeln('Cloned directory: ' + dir)
        }

        resolve(cmd);
      });
  });
}

async function start(grunt, options) {
  const repoDir = './' + options.repoDir,
        repoDocsDir = './' + options.repoDir + '/docs';

  // Check for repo directory, make one if doesn't exist
  if (!fs.existsSync(repoDir)){
    grunt.log.writeln('Creating directory: ' + repoDir);
    fs.mkdirSync(repoDir);
  }

  // Clone repository
  const cmd = await cloneRepo(grunt, options.repo, repoDocsDir);

  // TODO: Copy directories in 'repoPath' to /views/developers

  // TODO: Covert Markdown (MD) files to HTML

  // Remove the repo directory
  await removeDirectory(grunt, repoDir);

  // End
  return true;
}

module.exports = function(grunt) {
  grunt.registerTask('docs', 'Generate docs', function() {
    const done = this.async();
    start(grunt, this.options()).then(d => done(d));
  });
};
