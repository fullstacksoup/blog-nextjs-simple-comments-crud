const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import LibConst from "@/libs/SiteConn";
//
export default async function (req, res){
  try{
    console.log('API', req.body);
    var data = req.body
    

    var dbFile = LibConst.get_config().CommentDbFileName
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const result = await db.run(
      'UPDATE Comments SET Content = ? WHERE CommentId = ?',      
      data.Content,
      data.CommentId
    )    

    res.json(result);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};