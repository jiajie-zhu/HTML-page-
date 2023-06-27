

const express = require('express')
const multer = require("multer")
const router = express.Router()
const path = require('path')
const data = require('./data')

const artists = data.artists
const artworks = data.artworks


const storage = multer.diskStorage({
  // 配置文件上传后存储的路径
  destination: function (req, file, cb) {
      // NodeJS的两个全局变量
      // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
      // console.log(__filename); //获取当前文件在服务器上的完整路径 
      cb(null, path.join(__dirname,'./uploads'))
  },
  // 配置文件上传后存储的路径和文件名
  filename: function (req, file, cb) {
    let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + fileData)
  }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  // #swagger.produces = ['text/html']
  res.type('html')
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


router.get('/artists', (req, res) => {
  // #swagger.tags = ['Artist']
  // #swagger.description = 'List all artists'
  res.json(artists)
})

// router.post('/artist', (req, res) => {
//   // #swagger.tags = ['Aartist']
//   // #swagger.description = 'Add new artist'
//   // TODO: check the validilty and insert data into data base
//   res.send('OK')
// })

router.get('/artist/:id', (req, res) => {
  // #swagger.tags = ['Artist']
  // #swagger.description = 'Get the details of an artist by id'
  const id = parseInt(req.params.id)
  for (let i = 0, l = data.artists.length; i < l; ++i) {
    if (id === artists[i].id) {
      res.json(artists[i])
      return
    }
  }
  res.status(404).send('No such an artist')
})

router.post('/artist/:id', (req, res) => {
  // #swagger.tags = ['Artist']
  // #swagger.description = 'update the details of an artist by id'
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema:{
          $ref: "#/definitions/Artist"
        }
      }
    }
  }
  */
  const id = parseInt(req.params.id)
  for (let i = 0, l = data.artists.length; i < l; ++i) {
    if (id === artists[i].id) {
      const body = req.body
      artists[i].avatar = body.avatar
      artists[i].name = body.name
      artists[i].bio = body.bio
      res.send('OK')
      return
    }
  }
  res.status(400).send('Invalid id of artist')
})

router.get('/artworks', (req, res) => {
  // #swagger.tags = ['Artwork']
  // #swagger.description = 'List all artworks'
  res.json(artworks)
})

router.get('/artwork/:id', (req, res) => {
  // #swagger.tags = ['Artwork']
  // #swagger.description = 'Get the details of an artwork by id'
  const id = parseInt(req.params.id)
  for (let i = 0, l = data.artworks.length; i < l; ++i) {
    if (id === artworks[i].id) {
      /* #swagger.responses[200] = {
            description: 'successfully obtained.',
            schema:  {
                id: 15,
                url: 'https://cdn.pixabay.com/photo/2023/02/28/15/58/off-grid-living-7821244__340.jpg',
                author_id: 3
            }
    } */
      res.json(artworks[i])
      return
    }
  }
  res.status(404).send('No such an artwork')
})

router.post('/artwork/:id', (req, res) => {
  // #swagger.tags = ['Artwork']
  // #swagger.description = 'update the details of an artwork by id'
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/Artwork"
        }
      }
    }
  }
  */

  const id = parseInt(req.params.id)
  for (let i = 0, l = data.artworks.length; i < l; ++i) {
    if (id === artworks[i].id) {
      const body = req.body
      artworks[i].url = body.url
      artworks[i].author_id = body.author_id
      res.send('OK')
      return
    }
  }
  res.status(400).send('Invalid id of artwork')
})

router.get('/artworks/by/author/:authorId', (req, res) => {
  // #swagger.tags = ['Artwork']
  // #swagger.description = 'list all artworks by authorId'
  const id = parseInt(req.params.authorId)
  const collect = []
  for (let i = 0, l = data.artworks.length; i < l; ++i) {
    if (id === artworks[i].author_id) {
      collect.push(artworks[i])
    }
  }
  if (collect.length === 0) {
    return res.status(404).send('No such an artist')
  } else {
    return res.json(collect)
  }
})



router.post("/upload-photos",upload.array("files",20),(req,res)=>{
    //接收上传文件数据
    //console.log(req)
    let imgUrl = req.files;
    const data = {
                code: 1,
                msg: imgUrl
            }
        
        res.send(data)
})


module.exports = router
