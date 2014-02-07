var portest = 1234
var PORT = +portest || 1337;
console.log(PORT);
var cluster = require('cluster');
var os      = require("os");

console.log(__dirname)
;if (cluster.isMaster) {


  // In real life, you'd probably use more than just 2 workers,
  // and perhaps not put the master and worker in the same file.
  //
  // You can also of course get a bit fancier about logging, and
  // implement whatever custom logic you need to prevent DoS
  // attacks and other bad behavior.
  //
  // See the options in the cluster documentation.
  //
  // The important thing is that the master does very little,
  // increasing our resilience to unexpected errors.
  console.log('fork you');
  cluster.fork();
  cluster.fork();
  
  console.log('forked you');
  cluster.on('disconnect', function(worker) {
    console.error('disconnect!');
    cluster.fork();
  });
  cluster.on('exit', function () {
    console.log('exit');
  });

} else {
  console.log('the worker')
  setTimeout(function() {console.log('setTimeout')}, 3000);

   
}