const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/auth');
const memberscontroller = require('../controllers/members');

router.get('/allmembers', auth, memberscontroller.getallmembers);
router.post('/newmember',auth,memberscontroller.createnewmember);
router.get('/searchmember',auth,memberscontroller.getsearchedmembers);
router.get('/monthlymember',auth,memberscontroller.monthlymember);
router.get('/expiringwithin3days',auth,memberscontroller.expiringwithin3days);
router.get('/expired',auth,memberscontroller.expiremember);
router.get('/inactive',auth,memberscontroller.inactive);
router.get('/getindmember/:id',auth,memberscontroller.getindmember);
router.post('/changestatus/:id',auth,memberscontroller.changestatus);
router.put('/updatememplan/:id',auth,memberscontroller.updatememplan);

module.exports = router;