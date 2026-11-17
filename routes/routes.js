const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.showHome);
router.get('/login', controller.showLogin);
router.post('/login', controller.handleLogin);
router.post('/register', controller.handleRegister);
router.get('/logout', controller.handleLogout);

router.get('/book', controller.showBookPage);
router.post('/book', controller.handleCreateBooking);
router.get('/booking', controller.showMyBookings);

router.get('/manager', controller.showManagerPage);
router.post('/manager/update', controller.handleUpdateBooking);

module.exports = router;