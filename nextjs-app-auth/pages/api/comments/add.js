const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';
import moment from 'moment';
import LibConst from "../../../libs/SliteConn";

//
export default async function (req, res){
  try{
    console.log('ADD API', req.body);

    var data = req.body
    
    var today = new Date();
    const createData = moment(today).format('YYYY-MM-DD HH:MM:SS');
    console.log('API today', today);
    
    var dbFile = LibConst.get_config().CommentDbFileName
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    
    const result = await db.run(
      'INSERT INTO Comments (UserId, Content, Replies, IsActive, DateCreated) VALUES ( ?, ?, ?, ?, ?)',      
      data.UserId,
      data.Content,
      0,
      1,
      createData,
    )    
    

    var ret ={
      CommentID: result.CommentId
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};