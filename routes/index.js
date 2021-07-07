var express = require('express');
var router = express.Router();
var multer  = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, 'public/');
  },  filename: function (req, file, callback) {
      callback(null, file.originalname.split("\\\\").join("\\"));
  }
});

var upload = multer({ storage: storage }).any()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("permissions-policy","interest-cohort=()");
  res.render('index', { title: 'Express', token:'test' });
});

router.get('/download',function(req,res,next){
try{
  var filename =  global.connectionManager.getConnection(req.query["id"]).name;
  var mimetype =  global.connectionManager.getConnection(req.query["id"]).mimeType;
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  console.log(global.connectionManager.getConnection(req.query["id"]).stream);
  var stream = global.connectionManager.getConnection(req.query["id"]).stream;
  var downloaded = 0;
  stream.on('data', function(chunk){
    downloaded += chunk.length;
    console.log('downloaded', downloaded);
    /*if(downloaded==43){
      stream.end();
    }
    */
  })
  .pipe(res);
}catch(e){
  console.log(e);
}
})

router.post('/uploadchunk',(req,res,next)=>{
  console.log("middleware")
  console.log("auth", req.headers.authorization);
  console.log("body", req.files)

  next();
},upload,function(req,res,next){
  
  res.status(200).end();
 
  
});

router.get('/receive',function(req,res,next){
  
  res.render('index');
});

router.get('/worker',function(req,res,next){
  res.render('worker');
})

module.exports = router;
