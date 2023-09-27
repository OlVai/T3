//#region inits: 
const ShortUniqueId = require('short-unique-id');
const funcs = require("./server_funcs.js");
var checksum = require('checksum');
const uid = new ShortUniqueId({ length: 10 });
var fs = require('fs'); 

//#endregion

//#region Servers' init: 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

//HTTP "Command line" init
const cmd_app = http.createServer(app);
const httpCMD = socketIo(cmd_app);
//server init
const server_app = http.createServer(app);
const server = socketIo(server_app);
//#endregion

//#region Express http: 
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
//#endregion

//#region Http CMD message controls: 
httpCMD.on('connection', (socket) => {
  console.log(`A CMD user ${socket.id} connected`);

  // Listen for messages from clients
  socket.on('generate_file', (data) => {
    var fileName = uid.rnd();
    var filePath = `/serverdata/${fileName}.txt`;
    var content = funcs.random_stuff(8000);
    fs.writeFileSync(filePath, content);

    checksum.file(filePath, function (err, sum){
      console.log(`Sum: ${sum}`)
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        server.emit('check_this_txtFile', data, sum, fileName );
      });
    })

  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`A CMD user ${socket.id} disconnected`);
  });
});
//#endregion

//#region Server message controls: 
server.on('connection', (socket) => {
  console.log(`A server user ${socket.id} connected`);

  // Listen for messages from clients
  socket.on("txtFileResult", (data) => {
    if(data) httpCMD.emit("message", "Text file has been successfully transmitted.")
    if(!data) httpCMD.emit("message", "Text file did not pass the check sum.")
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`A server user ${socket.id} disconnected`);
  });
});
//#endregion

//#region PORTS:
//################################# PORTS ##################################
/**///HTTPS CMD                                                         /**/
/**/  const port1 = process.env.PORT || 80;                             /**/
/**/  cmd_app.listen(port1, () => {                                     /**/
/**/    console.log(`CMDapp is running on http://localhost:${port1}`);  /**/
/**/  });                                                               /**/
/**///SERVER                                                            /**/
/**/  const port2 = process.env.PORT || 3000;                           /**/
/**/  server.listen(port2, () => {                                      /**/
/**/    console.log(`CMDapp is running on http://localhost:${port2}`);  /**/
/**/  });                                                               /**/
/**/                                                                    /**/
//##########################################################################
//#endregion

//Hello end of the world!