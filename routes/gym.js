const express = require('express');
const router = express.Router();
const gymcontroller = require('../controllers/gym');

router.post('/register',gymcontroller.register);
router.post('/login',gymcontroller.login);
router.post('/reset-password/sendotp',gymcontroller.sendotp);
router.post('/reset-password/checkotp',gymcontroller.checkotp);
router.post('/reset-password',gymcontroller.resetpassword);
router.post('/logout',gymcontroller.logout);

module.exports = router;