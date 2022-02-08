const express = require('express');
const { User } = require('../schema');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', { title: "Sign Up" })
});

router.get('/login', (req, res) => {
	res.render('login', { title: "Login" })
});

router.post('/login', (req, res) => {
	res.render('roomname', { title: "Choose Room" })
});

router.post('/signup', (req, res) => {
	const user = new User({ ...req.body, creation });
	user.save()
		.then(() => res.status(200).json(user))
		.catch(err => res.status(404).render("error"));
})

router.post('/room', (req, res) => {
	const { roomname } = req.body;
	res.render("room", { title: `Welcome to ${roomname}` })
})

module.exports = router;