const assert = require('chai').assert
const ParkingLotModel = require('../models/ParkingLot')
const CarModel = require('../models/Car')

describe('ParkingLot', ()=>{

  let parkingLot =  new ParkingLotModel(1);

  context('When creating a parking lot', () => {
    it("should return an instance of parking lot", () => {
      assert.instanceOf(new ParkingLotModel(1), ParkingLotModel)
    })
  })

  context('When _getNextAvailableSlot is called', ()=> {
    it("should return 1", () => {
      assert.equal(parkingLot._getNextAvailableSlot(), 1)
    })


    it("should return undefined", () => {
      parkingLot.park(new CarModel('MH-12-EE-1234', 'WHITE'))
      assert.isUndefined(parkingLot._getNextAvailableSlot())
    })
  })


  context('When adding a car to the parking lot ', ()=>{
    it("should return 1", () => {
      parkingLot = new ParkingLotModel(1);
      assert.equal(parkingLot.park(new CarModel('MH-12-EE-1234', 'WHITE')), 1)
    })

    it("should return false", () => {
      assert.isUndefined(parkingLot.park(new CarModel('MH-12-EE-1334', 'WHITE')))
    })
  })

  context('When the parking status is called', ()=>{
    it("should return an map object with its values", () => {
      assert.typeOf(parkingLot.status(), 'Map')
    })
  })

  context('When the slotNumberByRegistrationNumber is called', () => {
    it("should return the slot Number 1", () => {
      assert.equal(parkingLot.slotNumberByRegistrationNumber('MH-12-EE-1234'), 1)
    })

    it("should return undefined", () => {
      assert.isUndefined(parkingLot.slotNumberByRegistrationNumber('MH-12-EE-1134'))
    })
  })

  context('When the registrationNumberByColor is called', () => {
    it("should return the registration number array", () => {
      let res = parkingLot.registrationNumberByColor('WHITE')
      assert.isArray(res)
      assert.include(res, 'MH-12-EE-1234')
    })

    it("should return undefined", () => {
      assert.isUndefined(parkingLot.registrationNumberByColor('BLUE'))
    })
  })

  context('When the slotNumbersByCarColor is called', () => {
    it("should return the registration number array", () => {
      let res = parkingLot.slotNumbersByCarColor('WHITE')
      assert.isArray(res)
      assert.include(res, 1)
    })

    it("should return undefined", () => {
      assert.isUndefined(parkingLot.slotNumbersByCarColor('BLUE'))
    })
  })
})