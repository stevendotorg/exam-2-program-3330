const { name } = require('ejs');
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