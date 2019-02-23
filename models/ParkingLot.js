class ParkingLot {

  constructor(totalSlots){
    this.totalSlots = totalSlots
    this.lastCarParkedSlot = 0
    this.nearestAvailableSlots = new Array()
    this.colorMap = new Map()
    this.carMap = new Map()
    this.slotMap = new Map()
  }

  park(newCar) {
    // get next slot
    const newSlot = getNextAvailableSlot(this)
    if (newSlot) {

      // Update Color mapping
      let colorCarsArray = []
      if (this.colorMap[newCar.carColor] || this.colorMap[newCar.carColor] instanceof Array) {
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
    this.carMap.delete(car.registrationNumber)
    let sameColorCars = this.colorMap.get(car.carColor)

    if (sameColorCars.length === 1){
      this.colorMap.delete(car.carColor)
    }else{
      let index = sameColorCars.indexOf(car);
      if (index !== -1) sameColorCars.splice(index, 1);
    }

    this.slotMap.delete(slotNumber)

    console.log(this.slotMap, this.colorMap, this.carMap)

    console.log(`${slotNumber} is now empty.`)
  }

  slotNumberByRegistrationNumber(registrationNumber) {
    let slotNumber = (this.carMap[registrationNumber])

    if (slotNumber) {
      return console.log(slotNumber)
    }
    console.log('Not Found')
  }

  registrationNumberByColor(color){
    let cars = (this.colorMap[color])

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
    let cars = (this.colorMap[color])
    if(cars && cars.length > 0) {

      const slotNos = []

      cars.forEach(car=>{

        slotNos.push(this.carMap[car.registrationNumber])

      })
      return console.log(slotNos.toString())
    }
    console.log('Not Found')
  }
}

// TODO: refine this
const getNextAvailableSlot = ({
    nearestAvailableSlots,
    totalSlots,
    lastCarParkedSlot
  }) => {
  // If parking has any freed up slots
  if (nearestAvailableSlots.length > 0) {
    return nearestAvailableSlots.pop()
  }

  if (totalSlots != lastCarParkedSlot) {
    return lastCarParkedSlot + 1
  }

  return null
}

module.exports = ParkingLot

/*
park KA-01-HH-1234 Blue
park KA-01-HH-1222 White
park KA-01-HH-1122 White
SLOT_NUMBERS_FOR_CARS_WITH_COLOR
SLOT_NUMBER_FOR_REGISTRATION_NUMBER
*/