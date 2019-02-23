class Car{
  constructor(registrationNumber, carColor){
    this._registrationNumber = registrationNumber.toUpperCase()
    this._carColor = carColor.toUpperCase()
  }

  get registrationNumber(){return this._registrationNumber}

  get carColor(){return this._carColor}
}

module.exports = Car