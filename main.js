const ParkingLotModel = require('./models/ParkingLot')
const CarModel = require('./models/Car')
const requestTemplate = require('./requestTemplate')

let parkingLot;

const init = () =>{
  console.log('Initializing...')
  parkingLot = new ParkingLotModel(8)
}

const start = () => {
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
      console.log("Hope you liked it. :)  ");
      process.exit();
    } else {
      orchestrate(data.trim().split(/\s+/g))
    }
    standard_output.write("> ")
  });
}

const orchestrate = (args) => {
  switch (args[0].toUpperCase()) {
    case 'PARK':
      if(validation(args)){
        park(args[1], args[2])
      }
      break
    case 'STATUS':
      status()
      break
    case 'LEAVE':
      if (validation(args)) {
        leave(args[1])
      }
      break
    case 'SLOT_NUMBERS_FOR_CARS_WITH_COLOR':
      if (validation(args)) {
        slotNumbersByCarColor(args[1])
      }
      break
    case 'REGISTRATION_NUMBER_FOR_CARS_WITH_COLOR':
      if (validation(args)) {
        registrationNumberByColor(args[1])
      }
      break
    case 'SLOT_NUMBER_FOR_REGISTRATION_NUMBER':
      if (validation(args)) {
        slotNumberByRegistrationNumber(args[1])
      }
      break
    default:
      console.log("It should be either of the following.")
      break
  }
}

const park = (registrationNumber, carColor) =>
  parkingLot.park(new CarModel(registrationNumber, carColor))

const status = () => parkingLot.status()

const slotNumbersByCarColor = (color) =>
  parkingLot.slotNumbersByCarColor(color.toUpperCase())

  const slotNumberByRegistrationNumber = (registrationNumber) => parkingLot.slotNumberByRegistrationNumber(registrationNumber.toUpperCase())

const registrationNumberByColor = (color) =>
  parkingLot.registrationNumberByColor(color.toUpperCase())

const leave = (slotNumber) => parkingLot.leave(parseInt(slotNumber))

const validation = (args) => {
  let template = requestTemplate[args[0].toUpperCase()]

  if(args.length > template.arguments.length){
    let length = template.arguments.length

    for( let i = 1; i <= length ; i++){
      let regString = template.arguments[i - 1].regex

      let regEx = new RegExp(regString.pattern, regString.flags)

      if (!args[i].match(regEx)){
        console.log(template.default_example)
        return false
      }
    }
    return true
  }
  console.log(template.default_example)
  return false
}

init()
start()