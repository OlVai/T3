//#region General inits: 
const ShortUniqueId = require('short-unique-id');
const funcs = require("./server_funcs.js");
const uid = new ShortUniqueId({ length: 10 });
var fs = require('fs'); 
const readline = require('readline');
const pgp = require('pg-promise')(/* options */)

//#endregion

//#region influxDB init:
const {InfluxDB, Point} = require('@influxdata/influxdb-client');
const url = "http://stats:8086"
const token = "olipakerranyksipienidatapankki"
const org = "OlliOy"
const bucket = "site-statistics"
let point_int = 0;

const influxDB = new InfluxDB({ url, token })
const writeApi = influxDB.getWriteApi(org, bucket)
//#endregion

//#region Database init:
const DBs = [];
function addDB(database_){
  DBs.push({name:`${database_}`, database:pgp(`postgres://admin:Qwerty1!@database/${database_}`)});
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
    console.log(`Socket: ${socket.id} connected`);
    
    //#region Logging a connection:
    const ip = socket.handshake.address;

    const point1 = new Point(`connections`)
    .tag('ip', `${ip}`)
    .floatField('value', 0)
      writeApi.writePoint(point1);
      console.log(`New connection from ${ip} logged successfully!`);
  
    point_int++;
    //#endregion

    //#region CMD disconnect:
      socket.on('disconnect', () => {
        console.log(`Socket: ${socket.id} disconnected`);
        });
    //#endregion

    //#region CMD db_stuff:
    socket.on('db_stuff', (data) => {

      const targetValue = data;
      const index = DBs.findIndex(db => db.name === targetValue);

      if (index !== -1) {
        console.log(`The index of '${targetValue}' is ${index}`);
      } else {
        console.log(`'${targetValue}' not found in the object.`);
      }

      async function fetchRowsFromTable(index, tableName) {
        try {
          const rows = await DBs[index].database.any(`SELECT * FROM "${tableName}" LIMIT 50`);
          return rows;
        } catch (error) {
          console.error(`Error fetching rows from ${tableName}:`, error);
          throw error;
        }
      }

      async function fetchColumnNamesFromTable(index, tableName) {
        try {
          const rows = await DBs[index].database.any(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${tableName}'`);
          return rows;
        } catch (error) {
          console.error(`Error fetching rows from ${tableName}:`, error);
          throw error;
        }
      }

      async function fetchTableNames(index) {
        try {
          const rows = await DBs[index].database.any('SELECT table_name FROM information_schema.tables WHERE table_schema = $1', ['public']);
          return rows;
        } catch (error) {
          console.error(`Error fetching rows from ${index}:`, error);
          throw error;
        }
      }
    
      console.log(`db_stuff called for database: ${data}`);

      (async function () {
        const tables = await fetchTableNames(index);
        // Iterate over the tables
        for (const table of tables) {
          const tableName = table.table_name;
  
          // Initialize jsonData for each table
          var jsonData = {
            "title": tableName, // Use tableName as the title
            "items": []
          };
  
          // Fetch the first 50 rows from each table
          const rows = await fetchRowsFromTable(index, tableName);

  
          // Add column names as the first item in jsonData.items
            const columnNames = await fetchColumnNamesFromTable(index, tableName);
            jsonData.items.push(columnNames.map(item => item.column_name));
  
          // Push rows into jsonData.items for this table
          jsonData.items = jsonData.items.concat(rows);
          console.log(JSON.stringify(jsonData, null, 2));
  
          // Send jsonData for this table separately
          socket.emit("message", JSON.stringify(jsonData, null, 2));
        }
      })();

    });
    
    //#endregion

    //#region CMD get_databases:
    socket.on('get_databases', () => {
      const databaseNames = [];
      DBs.forEach((element) => {
        databaseNames.push(element.name);
      });
      socket.emit('database_names', databaseNames);
      console.log('Database Names:', databaseNames), ' sent to client!';
    });
    //#endregion

    //#region CMD add_network_db:
    socket.on('add_network_db', (data) => {
      var newDatabaseName = data;
    
      DBs[0].database.none(`CREATE DATABASE ${newDatabaseName};`)
        .then(() => {
          addDB(`${newDatabaseName}`);
          console.log(`Database '${newDatabaseName}' created successfully.`);
    
          // Create a promise for updating the content
          const updateContentPromises = [];
            var filePath = 'newDB.sql';
            var fileStream = fs.createReadStream(filePath);
    
            var rl = readline.createInterface({
              input: fileStream,
              crlfDelay: Infinity // To handle both '\r\n' and '\n' line endings
            });
    
            rl.on('line', (line) => {
              updateContentPromises.push(DBs[DBs.length - 1].database.none(`${line}`));
            });
    
            rl.on('close', () => {
              console.log('File reading completed.');
            });
    
          return Promise.all(updateContentPromises);
        })
        .then(() => {
          // After the promise is resolved, emit the 'switch_tab' event
          const databaseNames = [];
          DBs.forEach((element) => {
            databaseNames.push(element.name);
          });
          socket.emit('database_names', databaseNames);
          console.log('Database Names:', databaseNames), ' sent to client!';
          socket.emit('switch_tab', `${data}`);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    });

    //#endregion
    
    //#region CMD add_row: 
    socket.on('add_row', (data) => {
      console.log("I AM CALLED!")
      console.log(JSON.stringify(data))

      const targetValue = data.database;
      const index = DBs.findIndex(db => db.name === targetValue);
      console.log(`${index}`)

      // Extract the table name from the 'heading' property
      const tableName = data.heading;

      // Extract the column names and their corresponding values
      const columns = [];
      const values = [];
      Object.keys(data).forEach(key => {
          if (key !== "heading" && key !== "database" && key !== "id") {
              columns.push(key);
              values.push(data[key]);
          }
      });

      // Create the insert query without the 'id' column
      const insertQuery = `
          INSERT INTO "${tableName}"(${columns.join(', ')})
          VALUES($1, $2, $3)
          RETURNING *;
      `;

      // Use the query with the data
      DBs[index].database.one(insertQuery, values)
          .then(result => {
              console.log('Row inserted:', result);
              socket.emit('refresh_page');
          })
          .catch(error => {
              console.error('Error inserting row:', error);
          });
    });

    //#endregion

    //#region CMD remove_row:
    
    socket.on('remove_row', (data) => {
      console.log(JSON.stringify(data));

      const targetValue = data.database;
      const index = DBs.findIndex(db => db.name === targetValue);

      DBs[index].database.none(`DELETE FROM "public"."${data.heading}" WHERE id = $1`, [data.id])
      .then(() => {
        console.log('Row deleted successfully');
        socket.emit('refresh_page');
      })
      .catch(error => {
        console.error('Error deleting row:', error);
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