const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import LibConst from "@/libs/SiteConn";

export default async function (req, res){
  try{
    var dbFile = LibConst.get_config().CommentDbFileName
    
// console.log(d)
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const sqlQuery = 'SELECT c.CommentId, c.UserId, c.Content, ' +
    'c.Replies, c.IsActive, c.DateCreated, c.DateModified,' +
    'u.UserId, u.Name, u.Picture ' +
    'FROM Comments c, Users u WHERE c.UserId = u.UserId ORDER BY c.CommentId DESC';  
    
    const items = await db.all(sqlQuery);    var ret ={
      items: items
    }
    res.status(200).json(ret);

  } catch (err) {
      console.error(err);
      res.status(500).send();    
  }   
};
