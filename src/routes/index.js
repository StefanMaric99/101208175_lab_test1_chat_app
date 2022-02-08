const express = require('express');
const { User } = require('../schema');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('signup', { title: "Sign Up" })
});

router.post('/signup', (req, res) => {
	const creation = new Date().toTimeString();
	const user = new User({ ...req.body, creation });

	user.save()
		.then(() => res.status(200).render("login", { title: "Login" }))
		.catch(err => res.status(404).render("error", { title: "Sign Up Error" }));
})

router.get('/login', (req, res) => {
	res.render('login', { title: "Login" })
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username })
		.then((user) => {
			if (user['password'] === password) {
				// login succeed.
				req.session.user = user;
				req.session.isAuth = true;
				res.render('roomname', { title: 'Choose Room' })
			} else {
				// wrong password. in fact, no need to tell user that password is wrong
				res.status(404).render("error", { title: 'Wrong password !!' })
			}
		})
		.catch((err) => res.status(404).render("error", { title: "Log in Error" }))
});

router.post('/room', (req, res) => {
	const { roomname } = req.body;
	req.session.roomname = roomname;
	res.render("room", { title: `Welcome to ${roomname}` })
})

module.exports = router;
