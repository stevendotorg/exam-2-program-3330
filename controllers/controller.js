const service = require('../services/service');

let currentUser = null;

function showHome(req, res) {
  res.render('index', { currentUser: currentUser });
}

function showLogin(req, res) {
  const allUsers = service.getUsers();
  res.render('login', {
    currentUser: currentUser,
    users: allUsers
  });
}

function handleLogin(req, res, next) {
  try {
    const found = service.getUserbyID(req.body.userId);
    if (!found) {
      throw new Error('Please select a valid user');
    }

    currentUser = found;

    if (currentUser.role === 'manager') {
      res.redirect('/manager');
    } else {
      res.redirect('/book');
    }
  } catch (err) {
    next(err);
  }
}

function handleRegister(req, res, next) {
  try {
    const newUser = service.Register(req.body.name, req.body.email, req.body.role);
    currentUser = newUser;

    if (currentUser.role === 'manager') {
      res.redirect('/manager');
    } else {
      res.redirect('/book');
    }
  } catch (err) {
    next(err);
  }
}

function handleLogout(req, res) {
  currentUser = null;
  res.redirect('/');
}

function showBookPage(req, res) {
  if (!currentUser) {
    res.redirect('/login');
  } else {
    res.render('book', {
      currentUser: currentUser,
      rounds: service.getRounds(),
      teeTimes: service.getTeeTimes(),
      equipments: service.getEquipment()
    });
  }
}

function handleCreateBooking(req, res, next) {
  try {
    if (!currentUser) {
      res.redirect('/login');
    } else {
      service.createBooking(
        currentUser.UserID,
        req.body.roundID,
        req.body.teetimeID,
        req.body.equipmentID
      );
      res.redirect('/booking');
    }
  } catch (err) {
    next(err);
  }
}

function showMyBookings(req, res) {
  if (!currentUser) {
    res.redirect('/login');
  } else {
    const myBooking = service.GetBooking(currentUser.UserID);
    res.render('booking', {
      currentUser: currentUser,
      booking: myBooking
    });
  }
}
function showManagerPage(req, res, next) {
  if (!currentUser || currentUser.role !== 'manager') {
    next(new Error('Managers only'));
  } else {
    const allBookings = service.GetBookings();
    res.render('manager', {
      currentUser: currentUser,
      bookings: allBookings
    });
  }
}

function handleUpdateBooking(req, res, next) {
  try {
    if (!currentUser || currentUser.role !== 'manager') {
      throw new Error('Managers only');
    }

    service.updateBooking(req.body.ReservationID, req.body.status);
    res.redirect('/manager');
  } catch (err) {
    next(err);
  }
}

module.exports = {showHome, showLogin, handleLogin,handleRegister,handleLogout,showBookPage,handleCreateBooking,showMyBookings,showManagerPage,handleUpdateBooking};