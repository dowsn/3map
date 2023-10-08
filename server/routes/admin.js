import express from 'express';

// import Post from '../models/Post'; // getting model

const router = express.Router(); // we need router

// set layout
const adminLayout = '../views/layouts/admin';

/************* GET ADMIN / LOGIN PAGE***********/

router.get('/admin', async (req, res) => {
  // res.send('hello');

  try {
    const locals = {
      title: 'Admin',
      description: 'Simple blog',
    };

    res.render('admin/index', {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    // route to 404?
    console.log(error);
  }
});

/************* POST  - Admin check login *********/

router.post('/admin', async (req, res) => {
  // res.send('hello');

  try {
    const { username, password } = req.body;
    console.log(req.body);

    res.redirect('/admin');
  } catch (error) {
    // route to 404?
    console.log(error);
  }
});

export default router;
