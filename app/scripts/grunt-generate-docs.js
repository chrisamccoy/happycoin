const fs = require('fs'),
      rimraf = require('rimraf'),
      MarkdownIt = require('markdown-it');

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

function readFile(filePath) {
  return fs.readFileSync(filePath).toString();
}

function createHtmlFile(filePath, content) {
  const fileSplit = filePath.split('/');
        dir = './views/developers',
        filename = fileSplit[fileSplit.length - 1]
                      .replace('.md', '.html')
                      .toLowerCase();

  fileSplit.forEach(function(split, i){
    if (i > 0 && i < fileSplit.length - 1) {
      dir += '/'+split;
    }
  });

  // console.log(dir);

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(dir + '/' + filename, content);
}

function copyAndConvert(grunt, dir) {
  return new Promise(resolve => {
    // const md = new MarkdownIt(),
    //       file = dir + '/README.md';
    //
    // const doc = readFile(file);
    // createHtmlFile(file, md.render(doc))
    // resolve();

    const md = new MarkdownIt(),
          files = getFiles(dir);

    files.forEach(function(file){
      if (file.search('.md') > 0) {
        const doc = readFile(file);
        file = file.replace(dir, '');
        createHtmlFile(file, md.render(doc))
        resolve();
      }
    });
  });
}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

async function start(grunt, options) {
  const repoDir = './' + options.repoDir,
        repoDocsDir = './' + options.repoDir + '/docs';

  // STEP 1: Check for repo directory, make one if doesn't exist
  if (!fs.existsSync(repoDir)){
    grunt.log.writeln('Creating directory: ' + repoDir);
    fs.mkdirSync(repoDir);
  }

  // STEP 2:  Clone repository
  const cmd = await cloneRepo(grunt, options.repo, repoDocsDir);

  // TODO STEP 5: Place all directories and files in
  // /views/developers/ and convert md files into html
  await copyAndConvert(grunt, repoDocsDir);

  // STEP 4: Remove the repo directory
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
