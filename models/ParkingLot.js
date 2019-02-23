class ParkingLot {

  constructor(totalSlots){
    this.totalSlots = totalSlots
    this.lastCarParkedSlot = 0
    this.nearestAvailableSlots = new Array()
    this.colorMap = new Map()
    this.carMap = new Map()
    this.slotMap = new Map()

    console.log(`Created a parking lot with ${totalSlots} slots`)
  }

  park(newCar) {
    // get next slot
    const newSlot = this._getNextAvailableSlot()
    if (newSlot) {

      // Update Color mapping
      let colorCarsArray = []
      if (this.colorMap.get(newCar.carColor) && this.colorMap.get(newCar.carColor) instanceof Array) {
        colorCarsArray = this.colorMap.get(newCar.carColor)
      }

      colorCarsArray.push(newCar)

      // update Color map
      this.colorMap.set(newCar.carColor, colorCarsArray)

      // update Car Map
      this.carMap.set(newCar.registrationNumber,newSlot)

      // Update Parking lot slots
      this.slotMap.set(newSlot, newCar)

      this.lastCarParkedSlot++

      console.log(`Allocated slot number: ${newSlot}`)

    } else {
      console.log("Sorry, parking lot is full")
    }
  }

  // search for another way to print
  status(){
    console.log(`${'Slot No.'.padEnd(7)} ${'Registration No.'} ${'Colour'}`)

    this.slotMap.forEach((car, slotNo) => {
      console.log(`${slotNo.toString().padEnd(10 - (slotNo.toString().length))}${car.registrationNumber.padEnd(30 - (car.registrationNumber.length))}${car.carColor}`)
    })
  }

  leave(slotNumber){
    let car = this.slotMap.get(parseInt(slotNumber))
    if(!car){
      return console.log('Not Found')
    }
    this.carMap.delete(car.registrationNumber)
    let sameColorCars = this.colorMap.get(car.carColor)

    if (sameColorCars.length === 1){
      this.colorMap.delete(car.carColor)
    }else{
      let index = sameColorCars.indexOf(car);
      if (index !== -1) sameColorCars.splice(index, 1);
    }

    this.slotMap.delete(slotNumber)

    this.nearestAvailableSlots.push(slotNumber)

    this.nearestAvailableSlots.sort()

    console.log(`Slot number ${slotNumber} is free`)
  }

  slotNumberByRegistrationNumber(registrationNumber) {
    let slotNumber = (this.carMap.get(registrationNumber))

    if (slotNumber) {
      return console.log(slotNumber)
    }
    console.log('Not Found')
  }

  registrationNumberByColor(color){
    let cars = (this.colorMap.get(color))

    if (cars && cars.length > 0) {

      const registrationNos = []

      cars.forEach(car => {

        registrationNos.push(car.registrationNumber)

      })
      return console.log(registrationNos.toString())
    }
    console.log('Not Found')
  }

  slotNumbersByCarColor(color) {
    let cars = (this.colorMap.get(color))
    if(cars && cars.length > 0) {

      const slotNos = []

      cars.forEach(car=>{

        slotNos.push(this.carMap.get(car.registrationNumber))

      })
      return console.log(slotNos.toString())
    }
    console.log('Not Found')
  }

  _getNextAvailableSlot() {
    // If parking has any freed up slots
    if (this.nearestAvailableSlots.length > 0) {
      return this.nearestAvailableSlots.pop()
    }

    if (this.totalSlots != this.lastCarParkedSlot) {
      return this.lastCarParkedSlot + 1
    }

    return null
  }
}

module.exports = ParkingLot

/*
park KA-01-HH-1234 Blue
park KA-01-HH-1222 White
park KA-01-HH-1122 White
SLOT_NUMBERS_FOR_CARS_WITH_COLOR
SLOT_NUMBER_FOR_REGISTRATION_NUMBER
REGISTRATION_NUMBER_FOR_CARS_WITH_COLOR
*/