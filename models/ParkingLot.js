class ParkingLot {

  constructor(totalSlots){
    this.totalSlots = totalSlots // number of slots
    this.lastCarParkedSlot = 0 // furthest slot number used
    this.nearestAvailableSlots = new Array() // array for all the slots where the car has left
    this.colorMap = new Map() // map< Color, Car>
    this.carMap = new Map() // map< RegistrationNumber, SlotNumber>
    this.slotMap = new Map() // map< SlotNumber, Car >
  }

  park(newCar) {
    // get next slot
    const newSlot = this._getNextAvailableSlot()
    if (newSlot) {

      // Update Color mapping
      let colorCarsArray = []
      // check if the color is already in the map
      if (this.colorMap.get(newCar.carColor) && this.colorMap.get(newCar.carColor) instanceof Array) {
        // get the existing colorArray
        colorCarsArray = this.colorMap.get(newCar.carColor)
      }

      // add the new car to the colorArray
      colorCarsArray.push(newCar)

      // update Color map
      this.colorMap.set(newCar.carColor, colorCarsArray)

      // update Car Map with the new car
      this.carMap.set(newCar.registrationNumber,newSlot)

      // Update Parking lot slots with the new car
      this.slotMap.set(newSlot, newCar)

      // updated the lastCarParkedSlot
      this.lastCarParkedSlot++

      return newSlot
    }
  }

  status(){
    // send the slots
    return this.slotMap
  }

  leave(slotNumber){
    // get the car which is parked in that slot
    let car = this.slotMap.get(parseInt(slotNumber))
    // if car is not present then return false
    if(!car){
      return false
    }
    // remove car from Cars map
    this.carMap.delete(car.registrationNumber)

    let sameColorCars = this.colorMap.get(car.carColor)
    // remove the car from the color map
    if (sameColorCars.length === 1){
      this.colorMap.delete(car.carColor)
    }else{
      let index = sameColorCars.indexOf(car);
      if (index !== -1) sameColorCars.splice(index, 1);
    }

    // remove car from slot map
    this.slotMap.delete(slotNumber)

    // add the empty slot in the available Slots
    this.nearestAvailableSlots.push(slotNumber)

    // add
    this.nearestAvailableSlots.sort()
    return true
  }

  slotNumberByRegistrationNumber(registrationNumber) {
    // return the registration number
    return this.carMap.get(registrationNumber)
  }

  registrationNumberByColor(color){
    // get cars from color map
    let cars = (this.colorMap.get(color))

    if (cars && cars.length > 0) {

      const registrationNos = []

      cars.forEach(car => {

        registrationNos.push(car.registrationNumber)

      })
      return registrationNos
    }
  }

  slotNumbersByCarColor(color) {
    // get cars from the color map
    let cars = (this.colorMap.get(color))

    if(cars && cars.length > 0) {

      const slotNos = []

      // get the slot numbers from cars
      cars.forEach(car=>{
        // add the slot number to the array
        slotNos.push(this.carMap.get(car.registrationNumber))
      })
      // return the slot numbers
      return slotNos
    }
  }

  _getNextAvailableSlot() {
    // If parking has any freed up slots
    if (this.nearestAvailableSlots.length > 0) {
      return this.nearestAvailableSlots.pop()
    }

    // check if there is slot available in the parking lot
    if (this.lastCarParkedSlot < this.totalSlots) {
      return this.lastCarParkedSlot + 1
    }
  }
}

module.exports = ParkingLot
