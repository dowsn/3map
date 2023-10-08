import express from 'express';
import User from '../models/User'; // getting model

// import Post from '../models/Post'; // getting model

const router = express.Router(); // we need router

// set layout
const adminLayout = '../views/layouts/login';

/************* GET ADMIN / LOGIN PAGE***********/

router.get('/login', async (req, res) => {
  // res.send('hello');

  try {
    const locals = {
      title: 'Login',
      description: 'Login to your account to start texting',
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

router.post('/login', async (req, res) => {
  // res.send('hello');

  try {
    const { username, password } = req.body;


    let user = User.findOneBy({ username }, (err, user) => {
      if (!user) {
        console.log('no user found');
        return res.redirect('/login');
      } else {

        let decryptedPassword = await bcrypt.compare(password, user.password);
        if (!decryptedPassword) {
          console.log('wrong password');
          return res.redirect('/login');
        } else {
          console.log('logged in');
          return res.redirect('/');

          // set user to session
          // req.session.user = user;
          // req.session.save();

      }



      }

    }
      );

    // User.getAuthenticated(username, password, function (err, user, reason) {

    // }

    res.redirect('/');
  } catch (error) {
    // route to 404?
    console.log(error);
  }
});

export default router;
