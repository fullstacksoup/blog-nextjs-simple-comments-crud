

export default async function (req, res){
  try{
    var ret ={
      items: [1,2,3,4,5]
    }
    res.json(ret);
  } catch (err) {
      console.error(err);
      res.status(500).send();    
  }   
};
