var express = require('express');
var router = express.Router();
const blogController = require ('../controllers/blogController')
const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

router.get('/', authMiddleware, blogController.blogIndex);  //GET   => All blogs
router.get('/create',authMiddleware, blogController.blogCreatePage) //GET => blog create page
router.get('/:id',authMiddleware, blogController.blogDetails); //GET => get single blog
router.post('/',authMiddleware, blogController.blogPost); //POST  => add new blog
router.delete("/:id",authMiddleware, isAdminMiddleware, blogController.blogDelete); //DELETE => remove blog

module.exports = router;


// router.get('/single-blog', function(req, res, next) {
//   Blog.findById('68b5ec47f5d339baaa13d9ec').then((blog)=>{
//     res.render('single', { title: 'Blogs', blog: blog });
//   }).catch ((error)=>{
//     console.log(error)
//   })
// });

// router.get('/create-blog', function(req, res, next) {
//   const blog = new Blog({name: "Atisam2", blogUrl : "www.google.com", flash: "123"});
//   blog.save().then((result)=>{res.send(result)}).catch((err)=>{console.log(err)});
// });


