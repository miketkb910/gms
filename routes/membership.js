const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/auth');
const membershipcontroller = require('../controllers/membership');

router.post('/add',auth,membershipcontroller.addmembership);
router.get('/get-membership',auth,membershipcontroller.getmemberships);
router.delete('/remove',auth,membershipcontroller.remove);

module.exports = router;