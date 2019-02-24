const fs = require('fs')

const commandBlueprint = require('./assets/commandBlueprint.json')
const controller = require('./controllers/cmdController')
const validate = require('./middlewares/validation')

const startCLI = () => {
  // Get process.stdin as the standard input object.
  const standard_input = process.stdin;
  const standard_output = process.stdout;
  // Set input character encoding.
  standard_input.setEncoding('utf-8');

  // Prompt user to input data in console.
  standard_output.write("> ")

  // When user input data and click enter key.
  standard_input.on('data', function (data) {
    // User input exit.
    if (data === 'exit\n') {
      // Program exit.
      console.log("Hope you liked it. :)");
      process.exit();
    } else {
      orchestrate(data)
    }
    standard_output.write("> ")
  });
}

const orchestrate = (input) => {

  const args = input.trim().split(/\s+/g)
  switch (args[0].toUpperCase()) {
    case 'CREATE_PARKING_LOT':
      if (validate(args)) {
        controller.createParkingLot(args[1])
      }
      break
    case 'PARK':
      if(validate(args)){
        controller.park(args[1], args[2])
      }
      break
    case 'STATUS':
      controller.status()
      break
    case 'LEAVE':
      if (validate(args)) {
        controller.leave(args[1])
      }
      break
    case 'SLOT_NUMBERS_FOR_CARS_WITH_COLOUR':
      if (validate(args)) {
        controller.slotNumbersByCarColor(args[1])
      }
      break
    case 'REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR':
      if (validate(args)) {
        controller.registrationNumberByColor(args[1])
      }
      break
    case 'SLOT_NUMBER_FOR_REGISTRATION_NUMBER':
      if (validate(args)) {
        controller.slotNumberByRegistrationNumber(args[1])
      }
      break
    default:
      console.log(`Unknown Command ${args[0]}
      Available - ${Object.keys(commandBlueprint)}`)
      break
  }
}

const readFromFile = (filename) =>{
  try{
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
  readFromFile(process.argv[2])
} else {
  startCLI()
}