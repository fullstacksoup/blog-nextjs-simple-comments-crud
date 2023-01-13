const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';
import moment from 'moment';
import LibConst from "../../../libs/SliteConn";

//* D E L E T E   A   S I N G L E   C O M M E N T
export default async function (req, res){
  try{
    console.log('DELETE API', req.body);

    var data = req.body
        
    var dbFile = LibConst.get_config().CommentDbFileName
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    
    const result = await db.run(
      'DELETE FROM Comments WHERE CommentId = ?',      
      data.CommentId,
    )    
    
    const items = await db.all('SELECT * FROM Comments');
    var ret ={
      items: items
    }
    res.json(ret);


    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};