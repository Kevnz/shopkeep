var cluster = require('cluster');

var PORT = +process.env.PORT || 1337;

console.log('whatever');
if (cluster.isMaster) {
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
  //cluster.fork();
  //cluster.fork();
  console.log('forked you');
  cluster.on('disconnect', function(worker) {
    var log = require('./lib/logger');
    log.log('cluster disconnected');
    console.error('disconnect!');
    cluster.fork();
  });
  cluster.on('exit', function () {
    console.log('exit');
  });

} else {
  console.log('the worker')
  var domain = require('domain');

  // See the cluster documentation for more details about using
  // worker processes to serve requests.  How it works, caveats, etc.
  var app = require('./app').app;
  console.log('app', app);
  http = require('http');
  http.createServer(app).listen(app.get('port'), function(){
      var d = domain.create();
      d.on('error', function(er) {
        console.error('error', er.stack);
        console.log('error', er);
        try {
   
          cluster.worker.disconnect();

   
        } catch (er2) {
          // oh well, not much we can do at this point.
          console.error('Error sending 500!', er2.stack);
        }
      });
      console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
  });
}
 