const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';
import LibConst from "@/libs/SiteConn";

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
    
    const sqlSelectQuery = 'SELECT c.CommentId, c.UserId, c.Content, ' +
    'c.Replies, c.IsActive, c.DateCreated, c.DateModified,' +
    'u.UserId, u.Name, u.Picture ' +
    'FROM Comments c, Users u WHERE c.UserId = u.UserId ORDER BY c.CommentId DESC';  

    const items = await db.all(sqlSelectQuery);
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