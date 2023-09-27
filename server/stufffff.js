// Import required modules or libraries
const express = require('express');
var checksum = require('checksum');
const {NodeSSH} = require('node-ssh');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const short = require('shortid');

// Create an instance of the Express application
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
const ssh = new NodeSSH();

const password = '123'

const config = {
    host: 'my-nginx-container',
    username: 'root',
    port: 22,
    password,
    tryKeyboard: true,
}

var fileName = short();

//--------------------------------------- WHEN CLIENT CONNECTS ------------------------------------------
app.get('/', (req, res, next) => {
});
//--------------------------------------- WHEN CLIENT CONNECTS (END) ----------------------------------------


//------------------
app.get('/sad', (req, res) => {
});
//------------------

app.get('/getFile', (req, res) => {

    var filePath = `/serverdata/${fileName}.txt`;
    var content = random_stuff(8000);
    fs.writeFileSync(filePath, content);

        fs.appendFile(filePath, checksum(content), (err) => {
            if (err) {
              console.error(`Error appending to ${filePath}: ${err}`);
            } else {
              console.log('Data appended to the file.');
            }
          });

    console.log(`Created file ${fileName}.txt`);   
    fileName = short(); 
});




//------------------------------------------ WHEN SERVER STARTS ---------------------------------------------
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);



});
//------------------------------------------ WHEN SERVER STARTS (END)----------------------------------------




// Endpoint to list files in the directory
app.get('/thefiles', (req, res) => {
    var directoryToIndex = '/serverdata';
    fs.readdir(directoryToIndex, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      // Create a list of file names
      const fileNames = files.map(file => {
        const filePath = path.join(directoryToIndex, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        return {
          name: file,
          isDirectory,
        };
      });
  
      // Render an HTML page with the list of files
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>File Indexer</title>
        </head>
        <body>
          <h1>Files in ${directoryToIndex}</h1>
          <ul>
            ${fileNames.map(file => `
              <li>
                ${file.isDirectory ? '📁' : '📄'} 
                <a href="/static/${file.name}">
                  ${file.name}
                </a>
              </li>
            `).join('')}
          </ul>
        </body>
        </html>
      `;
  
      res.send(html);
    });
  });

app.get('/*', (req, res, next) => {
    var fileName = req.url.slice(1)
    console.log(`Searching for file ${fileName}.`) //LOGGING
    if(searchForStringInFileNames('/serverdata', fileName)){
        var filePath = `/serverdata/${fileName}.txt`;
        var newPath = `/clientdata/${fileName}.txt`;
        var filesum = '';
        var content = '';
        console.log(`Slicing Cehcksum-tail from ${fileName}.`) //LOGGING

        fs.readFile(filePath, 'utf8', (err, data) => {
            filesum = data.slice(-(checksum('random').length));
            console.log(`Sliced ${fileName} tail is ${filesum}`) //LOGGING
            content = data.slice(0, -(filesum.length));
            fs.writeFile(filePath, content, 'utf8', (err) => {});
        });

        console.log(`Comparing checksum to sliced ${fileName}.`) //LOGGING
        console.log(`${content} vs ${filesum}`) //LOGGING
            if(checksum(content) === filesum)
            {
                console.log(`File ${fileName} is valid, sending to user...`) //LOGGING
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.setHeader('Content-disposition', `attachment; filename=${fileName}.txt`);
                        res.setHeader('Content-type', 'text/plain');
                        res.setHeader('Checksum', sum);
                        res.send(data);
                    }
                });

                console.log(`Transfering ${fileName} to client volume...`) //LOGGING
                ssh.connect(config)
                .then(() => {
                    return ssh.putFile(filePath, newPath);
                })
                .then(() => {
                  console.log('SSH connection established!');
                  ssh.dispose(); // Close the SSH connection
                })
                .catch((err) => {
                  console.error('Error:', err);
                });
                console.log(`Processing file ${fileName} complete!`) //LOGGING
            }

    }else { console.log("No file found!")}


});


function random_stuff(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function searchForStringInFileNames(directoryPath, searchString) {
    var found = false;
  try {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
        console.log(`searching from ${directoryPath}...`); //LOGGINg
        const filePath = path.join(directoryPath, file);

      
      if (file.includes(searchString)) {
        console.log("FOUND!");
        found = true;   
      }

      
      if (fs.statSync(filePath).isDirectory()) {
        searchForStringInFileNames(filePath, searchString);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error}`);
  }
  return found;
}