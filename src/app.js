const express = require('express');
const cluster = require('cluster');
const app = express();
const port = 4000;

function delay(duration) {
    let startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // event loop is blocked .....
    }
}

app.get('/', (req, res) => {
  res.send('Performance example...')
});

app.get('/time', (req, res) => {
    delay(9000);
    res.send(`ding ding ding ${process.pid}`)
});

if(cluster.isMaster) {
    console.log('Master has been startd....');
    
    //create Two worker process
    cluster.fork();
    cluster.fork();
} else {
    console.log('Worker has been started.....');

    // start listening the server on port number
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });

}
