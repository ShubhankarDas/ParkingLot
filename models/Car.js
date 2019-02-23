class Car{
  constructor(registrationNumber, carColor){
    this.registrationNumber = registrationNumber.toUpperCase()
    this.carColor = carColor.toUpperCase()
  }
}

module.exports = Car