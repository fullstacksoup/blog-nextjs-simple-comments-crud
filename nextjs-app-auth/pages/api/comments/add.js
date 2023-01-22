const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';
import moment from 'moment';
import LibConst from "../../../libs/SiteConn";

//
export default async function (req, res){
  try{
    var data = req.body
    
    var today = new Date();
    const createData = moment(today).format('YYYY-MM-DD HH:MM:SS');
    
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
    
    const sqlSelectQuery = 'SELECT c.CommentId, c.UserId, c.Content, ' +
    'c.Replies, c.IsActive, c.DateCreated, c.DateModified,' +
    'u.UserId, u.Name, u.Picture ' +
    'FROM Comments c, Users u WHERE c.UserId = u.UserId ORDER BY c.CommentId DESC';  

    const items = await db.all(sqlSelectQuery);
    var ret ={
      items: items
    }
    
    res.json(ret);

  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};