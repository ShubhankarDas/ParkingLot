class ParkingLot {

  constructor(totalSlots){
    this.totalSlots = totalSlots
    this.lastCarParkedSlot = 0
    this.nearestAvailableSlots = []
    this.colorMap = {}
    this.carMap = {}
    this.slotMap = {}
  }

  park(newCar) {
    // get next slot
    const newSlot = getNextAvailableSlot(this)
    if (newSlot) {

      // Update Color mapping
      if (!this.colorMap[newCar.carColor] || !this.colorMap[newCar.carColor] instanceof Array) {
        this.colorMap[newCar.carColor] = []
      }
      this.colorMap[newCar.carColor].push(newCar)

      // update Car Map
      this.carMap[newCar.registrationNumber] = newSlot

      // Update Parking lot slots
      this.slotMap[newSlot] = newCar

      this.lastCarParkedSlot++

      console.log(`Allocated slot number: ${newSlot}`)

    } else {
      console.log("Sorry, parking lot is full")
    }
  }

  status(){
    console.log(`${'Slot No.'.padEnd(7)} ${'Registration No.'} ${'Colour'}`)
      Object.keys(this.slotMap).forEach(slotNo => {

        let car = this.slotMap[slotNo]

        console.log(`${slotNo.padEnd(10 - (slotNo.length))}${car.registrationNumber.padEnd(30 - (car.registrationNumber.length))}${car.carColor}`)

      })
  }

  leave(slotNumber){

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