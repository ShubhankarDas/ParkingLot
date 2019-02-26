#!/usr/bin/env node

const fs = require('fs')

const commandBlueprint = require('./assets/commandBlueprint.json')
const controller = require('./controllers/cmdController')
const validate = require('./middlewares/validation')

// Start the cli and take user inputs
const startCLI = () => {
  // Get process.stdin as the standard input object.
  const standard_input = process.stdin;
  // Get process.stdin as the standard output object.
  const standard_output = process.stdout;
  // Set input character encoding.
  standard_input.setEncoding('utf-8');

  // When user input data and click enter key.
  standard_input.on('data', (data) => {
    // User input exit.
    if (data === 'exit\n') {
      // Program exit.
      process.exit();
    } else {
      // Handle the input
      data.split('\n').forEach(cmd => orchestrate(cmd))
    }
  });
}

// To handle the input data
const orchestrate = (input) => {

  // Get args from the string input
  const args = input.trim().split(/\s+/g)
  // Switch args[0] for checking which command has been used and change to uppercase for uniformity
  switch (args[0].toUpperCase()) {
    // To create a parking lot
    case 'CREATE_PARKING_LOT':
      // validate if all the parameters are given properly
      if (validate(args)) {
        // if passes validation then pass it to the controller size = args[1]
        controller.createParkingLot(args[1])
      }
      break
    // to park a car
    case 'PARK':
    // validate if all the parameters are given properly
      if(validate(args)){
        // if passes validation then pass it to the controller registrationNumber = args[1], Color = args[2]
        controller.park(args[1], args[2])
      }
      break
    // to get the status of the car
    case 'STATUS':
      controller.status()
      break
    case 'LEAVE':
    // validate if all the parameters are given properly
      if (validate(args)) {
        // if passes validation then pass it to the controller- slot number = args[1]
        controller.leave(args[1])
      }
      break

      case 'SLOT_NUMBERS_FOR_CARS_WITH_COLOUR':
      // validate if all the parameters are given properly
      if (validate(args)) {
        // if passes validation then pass it to the controller- color of the car = args[1]
        controller.slotNumbersByCarColor(args[1])
      }
      break
      // validate if all the parameters are given properly
    case 'REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR':
    // validate if all the parameters are given properly
      if (validate(args)) {
        // if passes validation then pass it to the controller- color of the car = args[1]
        controller.registrationNumberByColor(args[1])
      }
      break
    case 'SLOT_NUMBER_FOR_REGISTRATION_NUMBER':
    // validate if all the parameters are given properly
      if (validate(args)) {
        // if passes validation then pass it to the controller- registration number = args[1]
        controller.slotNumberByRegistrationNumber(args[1])
      }
      break
    // default:
    //   // if the command does not match print all the available commands
    //   console.log(`Unknown Command ${args[0]}
    //   Available - ${Object.keys(commandBlueprint)}`)
    //   break
  }
}

// To read from the file
const readFromFile = (filename) =>{
  try{
    // get line by line
    let commands = fs.readFileSync(filename).toString().split("\n")

    commands.forEach(command =>{
      if (command.trim() !== "") orchestrate(command)
    })
  }
  catch(e){
    console.log(e)
  }
}

if (process.argv.length > 2) {
  // if file is provided then read from the file
  readFromFile(process.argv[2])
} else {
  // start cli as file is not provided
  startCLI()
}