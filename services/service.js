const obj = require('./models');

const Users = [
    new obj.User(1, "Steven", "steven.guerra01@utrgv.edu", "golfer"),
    new obj.User(2, "Ben", "benexample@utrgv.edu", "golfer"),
    new obj.User(3, "Mr. Green Keeper", "GKeeper@golflinks.com", "manager")
];

const RoundOptions = [
    new obj.RoundOption(1, "Front Nine", 9, 25),
    new obj.RoundOption(2, "Back Nine", 9, 25),
    new obj.RoundOption(3, "Full Eighteen", 18, 40)
];

const TeeTimes = [
    new obj.TeeTime(1, "Today", "8:00AM", 2),
    new obj.TeeTime(2, "Today", "12:00PM", 1),
    new obj.TeeTime(3, "Tomorrow", "9:00AM", 4)
]

const Equipments = [
    new obj.Equipment(1, "Clubs", 10),
    new obj.Equipment(2, "Cart", 15)
]

const Reservations = [];

function getUsers() {
    return Users;
}

function getUserbyID(id){
    return Users.find( x => x.UserID === Number(id))
}

function Register(name, email, role){
    if (!name || !email){
        throw new Error('Name and Email are required')
    }
    const search = Users.find(x => x.email.toLowerCase() === email.toLowerCase());
    if(search){
        throw new Error("Email in use");
    }
    const newuser = new obj.User(Users.length + 1, name, email, role || 'golfer');
    Users.push(newuser);
    return newuser;
}

function getRounds(){
    return RoundOptions;
}

function getTeeTimes(){
    return TeeTimes;
}

function getEquipment(){
    return Equipments;
}

function createBooking(UserID, roundID,teetimeID,equipmentID){
    const user = getUserbyID(UserID);
    const round = RoundOptions.find(x => x.roundID === Number(roundID));
    const teetime = TeeTimes.find(x => x.teetimeID === Number(teetimeID));
    const equipment = equipmentID ? Equipments.find (x => x.EquipmentID === Number(equipmentID)) : null;

    if (!user){
        throw new Error("Must be logged in");
    }

    if (!round || !teetime) {
        throw new Error("Please make a valid selection");
    }
    if (teetime.openspots <= 0){
        throw new Error("Tee Time is full");
    }

    const totalcost = round.price + (equipment ? equipment.price : 0);
    teetime.openspots--;

    const booking = new obj.Reservation(Reservations.length + 1, user, round, teetime, equipment, totalcost, 'upcoming');
    Reservations.push(booking);
    return booking;
}

function GetBooking(UserID) {
  return Reservations.find(x => x.user.UserID === Number(UserID));
}

function GetBookings(){
    return Reservations;
}

function updateBooking(ReservationID, status){
    const booking = Reservations.find(x => x.ReservationID === Number(ReservationID));
    if(!booking) {
        throw new Error("Booking not found");
    }
    if (status === 'canceled'){
        booking.teetime.openspots++;
    }
    booking.status = status;
}

module.exports = {getUsers, getUserbyID, Register, getRounds,getTeeTimes, getEquipment, createBooking, GetBooking, GetBookings, updateBooking};
