const assert = require('chai').assert
const CarModel = require('../models/Car')


describe('Car model', () => {

  context('When creating an instance of a car', () => {
    it("should return an instance of Car", () => {
      assert.instanceOf(new CarModel('MH-12-EE-1234', 'White'), CarModel)
    })
  })

})