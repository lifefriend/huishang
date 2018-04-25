var npmUserDownloads = require('npm-user-downloads')
//npmUserDownloads(username,time)
npmUserDownloads('substack', 'last-month').then(function (res) {
  console.log(res);
});