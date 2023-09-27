const io = require("socket.io-client");
const socket = io("http://server:3000");
var checksum = require('checksum');
var fs = require('fs'); 

// client-side
socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on('check_this_txtFile', (data, file_sum, fileName) => {
    console.log(`Text file ${fileName}.txt recieved.`);
    console.log(`Sum received: ${file_sum}`);
    var tempFilepath = `/clientdata/${fileName}.txt`;

    fs.writeFileSync(tempFilepath, data, (err) => {
      if (err)
        console.log(err);
      else {}
    });

    checksum.file(tempFilepath, function (err, new_sum) {
      if (file_sum === new_sum) {
        console.log('Checksum passed! File saved on /clientdata.');
        socket.emit("txtFileResult", true);
      }
      else{
        fs.unlinkSync(tempFilepath);
        socket.emit("txtFileResult", false);
      }
    })

  });

socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });