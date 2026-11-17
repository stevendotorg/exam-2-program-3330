class User{
    constructor(UserID, name, email, role = 'golfer'){
        this.UserID = UserID;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

class RoundOption{
    constructor(roundID, name, holes, price){
        this.roundID = roundID;
        this.name = name;
        this.holes = holes;
        this.price = price;
    }
}

class TeeTime{
    constructor(teetimeID, date, time, openspots = 4){
        this.teetimeID = teetimeID;
        this.date = date;
        this.time = time;
        this.openspots = openspots;
    }
}

class Equipment {
    constructor(EquipmentID, name, price){
        this.EquipmentID = EquipmentID;
        this.name = name;
        this.price = price;
    
    }
}

class Reservation{
    constructor(ReservationID, user, round, teetime, equipment, totalcost, status = 'upcoming'){
        this.ReservationID = ReservationID;
        this.user = user;
        this.round = round;
        this.teetime = teetime;
        this.equipment = equipment;
        this.totalcost = totalcost;
        this.status = status;
    }
}

module.exports = {User, RoundOption, TeeTime, Equipment, Reservation};