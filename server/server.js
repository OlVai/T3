//#region General inits: 
const ShortUniqueId = require('short-unique-id');
const funcs = require("./server_funcs.js");
const uid = new ShortUniqueId({ length: 10 });
var fs = require('fs'); 
const readline = require('readline');
const pgp = require('pg-promise')(/* options */)

//#endregion

//#region Database init:
const db = pgp('postgres://admin:Qwerty1!@database/db')

const altDB = [];
function addDB(database){
  altDB.push(`postgres://admin:Qwerty1!@database/${database}`)
}
addDB('db');
//#endregion

//#region Server's init: 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

//HTTP "Command line" init
const cmd_app = http.createServer(app);
const httpCMD = socketIo(cmd_app);
//#endregion

//#region Express http init: 
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
//#endregion

//#region Http socketIO CMD message controls: 
  httpCMD.on('connection', (socket) => {
    console.log(`A CMD user ${socket.id} connected`);

    //#region CMD disconnect:
      socket.on('disconnect', () => {
        console.log(`A CMD user ${socket.id} disconnected`);
        });
    //#endregion

    //#region CMD db_stuff:
    socket.on('db_stuff', () => {

      async function fetchRowsFromTable(tableName) {
        try {
          const rows = await db.any(`SELECT * FROM "${tableName}" LIMIT 50`);
          return rows;
        } catch (error) {
          console.error(`Error fetching rows from ${tableName}:`, error);
          throw error;
        }
      }
    
      console.log("db_stuff called!");
    
      db.any('SELECT table_name FROM information_schema.tables WHERE table_schema = $1', ['public'])
        .then(async data => {
          // Iterate over the tables
          for (const table of data) {
            const tableName = table.table_name;
    
            // Initialize jsonData for each table
            var jsonData = {
              "title": tableName, // Use tableName as the title
              "items": []
            };
    
            // Fetch the first 50 rows from each table
            const rows = await fetchRowsFromTable(tableName);
    
            // Add column names as the first item in jsonData.items
            if (rows.length > 0) {
              const columnNames = Object.keys(rows[0]);
              jsonData.items.push(columnNames);
            }
    
            // Push rows into jsonData.items for this table
            jsonData.items = jsonData.items.concat(rows);
    
            // Send jsonData for this table separately
            socket.emit("message", JSON.stringify(jsonData, null, 2));
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    
    //#endregion

    //#region CMD get_databases:
    socket.on('get_databases', () => {
      const prefix = "postgres://admin:Qwerty1!@database/";
      const databaseNames = [];
      altDB.forEach((element) => {
        databaseNames.push(element.slice(prefix.length));
      });
      socket.emit('database_names', databaseNames);
      console.log('Database Names:', databaseNames);
    });
    //#endregion

    //#region CMD add_network_db:
    socket.on('add_network_db', (data) => {
      var newDatabaseName = data;

      db.none(`CREATE DATABASE ${newDatabaseName};`)
      .then(() => {
        addDB(`${newDatabaseName}`)
        console.log(`Database '${newDatabaseName}' created successfully.`);

        var filePath = 'newDB.sql';
        var fileStream = fs.createReadStream(filePath);

        var rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity // To handle both '\r\n' and '\n' line endings
        });

        rl.on('line', (line) => {
          pgp(altDB[altDB.length-1]).none(`${line}`);
          console.log(`Line: ${line}`);
        });

        rl.on('close', () => {
          console.log('File reading completed.');
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
    //#endregion


  });
//#endregion

//#region PORTS:
//################################# PORTS ##################################
/**///HTTPS CMD                                                         /**/
/**/  const port1 = process.env.PORT || 80;                             /**/
/**/  cmd_app.listen(port1, () => {                                     /**/
/**/    console.log(`CMDapp is running on http://localhost:${port1}`);  /**/
/**/  });                                                               /**/
/**///?                                                                 /**/
//##########################################################################
//#endregion

//Hello end of the world!