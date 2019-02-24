const assert = require('chai').assert
const ParkingLotModel = require('../models/ParkingLot')
const CarModel = require('../models/Car')

describe('ParkingLot', function(){

  let parkingLot = new ParkingLotModel(1)

  it("should return 1", function(){
    assert.equal(parkingLot.park(new CarModel('MH-12-EE-1234', 'WHITE')), 1)
  })

  it("should return false", function () {
    assert.equal(parkingLot.park(new CarModel('MH-12-EE-1234', 'WHITE')), false)
  })

  it("should return a map with car details", function () {
    assert.equal(parkingLot.park(new CarModel('MH-12-EE-1234', 'WHITE')), false)
  })
})