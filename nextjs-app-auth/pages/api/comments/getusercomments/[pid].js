const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';
import moment from 'moment';
import LibConst from "../../../../libs/SliteConn";

export default async function (req, res){

  if (req.method === 'GET') {
    try{
      
      const { pid } = req.query
      
      var dbFile = LibConst.get_config().CommentDbFileName
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
    
      const commentResult = await db.all(
        'SELECT CommentId, Replies, UserId, Content, IsActive, DateCreated, DateModified FROM Comments WHERE UserId = ?',      
        pid,
      )    
      
      const replyResult = await db.all(
        'SELECT ReplyId, ReplyToCommentId, UserId, Content, IsActive, DateCreated, DateModified FROM CommentReplies WHERE UserId = ?',      
        pid,
      )    
      var ret ={
        commentData: commentResult,
        replyData: replyResult
      }
      
      res.json(ret);

    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
  }
};