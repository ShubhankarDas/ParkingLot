const ParkingLotModel = require('../models/ParkingLot')
const CarModel = require('../models/Car')
const constants = require('../constants/constatnts')

let parkingLot;

module.exports= {
  createParkingLot(size){
    parkingLot = new ParkingLotModel(size)
    console.log(`Created a parking lot with ${size} slots`)
  },
  park(registrationNumber, carColor){
    if(!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)

    let newSlotNo = parkingLot.park(new CarModel(registrationNumber, carColor))
    if (newSlotNo) {
      console.log(`Allocated slot number: ${newSlotNo}`)
    }else{
      console.log(constants.PARKING_FULL)
    }
  },
  status(){
    if (!parkingLot){
      return console.log(constants.PARKING_LOT_NOT_FOUND)
    }
    let cars = parkingLot.status()
    if(cars){
      console.log(`${'Slot No.'.padEnd(7)} ${'Registration No.'} ${'Colour'}`)
      cars.forEach((car, slotNo) => {
        console.log(`${slotNo.toString().padEnd(10 - (slotNo.toString().length))}${car.registrationNumber.padEnd(30 - (car.registrationNumber.length))}${car.carColor}`)
      })
    }
  },
  slotNumbersByCarColor(color){
    if (!parkingLot)
      return console.log(constants.PARKING_LOT_NOT_FOUND)
    let slotNos = parkingLot.slotNumbersByCarColor(color.toUpperCase())
    if (slotNos){
      console.log(slotNos.toString())
    }else{
      console.log(constants.NOT_FOUND)
    }
  },
  slotNumberByRegistrationNumber(registrationNumber){
    if (!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)
    let slotNos = parkingLot.slotNumberByRegistrationNumber(registrationNumber.toUpperCase())

    if (slotNos){
      console.log(slotNos)
    }else{
      console.log(constants.NOT_FOUND)
    }
  },
  registrationNumberByColor(color){
    if (!parkingLot) return console.log(constants.PARKING_LOT_NOT_FOUND)
    let registrationNos = parkingLot.registrationNumberByColor(color.toUpperCase())
    if (registrationNos){
      console.log(registrationNos.toString())
    } else {
      console.log(constants.NOT_FOUND)
    }
  },
  leave(slotNumber){
    if (!parkingLot)
      return console.log(constants.PARKING_LOT_NOT_FOUND)
    let res = parkingLot.leave(parseInt(slotNumber))
    if (res){
      console.log(`Slot number ${slotNumber} is free`)
    }else{
      console.log(constants.NOT_FOUND)
    }
  }
}