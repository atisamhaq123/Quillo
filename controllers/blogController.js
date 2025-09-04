const Blog = require('../models/blog');
const User = require('../models/user');

//get all blogs
const blogIndex = function(req, res, next) {  
  Blog.find().sort({createdAt: -1}).then((result)=>{
    const blogs = result;
    res.render('index', { title: 'Blogs', blogs: blogs });
  }).catch ((error)=>{
    console.log(error)
  })
}
//get blog detail page
const blogCreatePage = function(req, res, next) {
  res.render('create', { title: 'Create Blog' });
}

//get blog details
const blogDetails = function(req, res, next) {
  const userId = req.cookies.id;
  let admin = false;
  User.findById(userId).then((user)=>{
    if (user.role=="admin"){
    admin = true;
  }
  });
  
  Blog.findById(req.params.id).then((blog)=>{
    res.render('detail', { title: 'Blog Detail Page', blog: blog, admin: admin });
  }).catch ((error)=>{
    res.render('404' , { title: '404 page' })
    console.log(error)
  });
};

//add new blog
const blogPost = function(req, res, next) {
  const newBlog = req.body;
  const blog = new Blog(newBlog);
   blog.save()
    .then(() => {
      res.redirect("/blogs"); // wait until blog is saved
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving blog");
    });
};

//delete blog
const blogDelete = function (req, res, next){  
  Blog.findByIdAndDelete(req.params.id).then(()=>{
    res.json({result: "/blogs" })
  }).catch ((error)=>{
    console.log(error);
  })
};

module.exports = {blogIndex, blogCreatePage, blogDetails, blogPost, blogDelete};