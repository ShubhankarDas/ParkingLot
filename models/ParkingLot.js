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

      return newSlot

    }
  }

  status(){
    return this.slotMap
  }

  leave(slotNumber){
    let car = this.slotMap.get(parseInt(slotNumber))
    if(!car){
      return false
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
    return true
  }

  slotNumberByRegistrationNumber(registrationNumber) {
    return this.carMap.get(registrationNumber)
  }

  registrationNumberByColor(color){
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
    let cars = (this.colorMap.get(color))
    if(cars && cars.length > 0) {

      const slotNos = []

      cars.forEach(car=>{

        slotNos.push(this.carMap.get(car.registrationNumber))

      })
      return slotNos
    }
  }

  _getNextAvailableSlot() {
    // If parking has any freed up slots
    if (this.nearestAvailableSlots.length > 0) {
      return this.nearestAvailableSlots.pop()
    }

    if (this.lastCarParkedSlot < this.totalSlots) {
      return this.lastCarParkedSlot + 1
    }
  }
}

module.exports = ParkingLot
