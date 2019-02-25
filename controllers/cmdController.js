const ParkingLotModel = require('../models/ParkingLot')
const CarModel = require('../models/Car')
const constants = require('../constants/constatnts')

// keep one instance of parking lot
let parkingLot;

module.exports= {
  // create a parking lot
  createParkingLot(size){
    parkingLot = new ParkingLotModel(size)
    console.log(`Created a parking lot with ${size} slots`)
  },
  // park a car
  park(registrationNumber, carColor){
    // check if parking lot is present
    if(!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)

    // get the slot number where the car is parked
    let newSlotNo = parkingLot.park(new CarModel(registrationNumber, carColor))

    if (newSlotNo) {
      // If slot number is present
      console.log(`Allocated slot number: ${newSlotNo}`)
    }else{
      // if slot number is null that means the parking lot is full
      console.log(constants.PARKING_FULL)
    }
  },
  status(){
    // check if parking lot is present
    if (!parkingLot){
      return console.log(constants.PARKING_LOT_NOT_FOUND)
    }

    // get all the cars in the parking lot
    let cars = parkingLot.status()
    if(cars){
      // log the titles
      console.log(`${'Slot No.'.padEnd(7)} ${'Registration No.'} ${'Colour'}`)
      // iterate cars and print out all the cars in a format
      cars.forEach((car, slotNo) => {
        console.log(`${slotNo.toString().padEnd(10 - (slotNo.toString().length))}${car.registrationNumber.padEnd(30 - (car.registrationNumber.length))}${car.carColor}`)
      })
    }
  },
  slotNumbersByCarColor(color){
    // check if parking lot is present
    if (!parkingLot)
      return console.log(constants.PARKING_LOT_NOT_FOUND)

    // get the slot numbers
    let slotNos = parkingLot.slotNumbersByCarColor(color.toUpperCase())

    console.log(slotNos ? slotNos.toString() : constants.NOT_FOUND)
  },
  slotNumberByRegistrationNumber(registrationNumber){
    // check if parking lot is present
    if (!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)

    // get the slot numbers
    let slotNos = parkingLot.slotNumberByRegistrationNumber(registrationNumber.toUpperCase())

    console.log(slotNos ? slotNos : constants.NOT_FOUND)
  },
  registrationNumberByColor(color){
    // check if parking lot is present
    if (!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)

    // get the registration numbers
    let registrationNos = parkingLot.registrationNumberByColor(color.toUpperCase())

    console.log(registrationNos ? registrationNos.toString() : constants.NOT_FOUND)
  },
  leave(slotNumber){
    // check if parking lot is present
    if (!parkingLot)
      return console.log(constants.PARKING_LOT_NOT_FOUND)

    // get the status of that slot
    let res = parkingLot.leave(parseInt(slotNumber))

    if (res){
      // res is true then the car has left the slot
      console.log(`Slot number ${slotNumber} is free`)
    }else{
      // could not find the slot
      console.log(constants.NOT_FOUND)
    }
  }
}