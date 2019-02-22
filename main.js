// Get process.stdin as the standard input object.
const standard_input = process.stdin;
const standard_output = process.stdout;
// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Welcome to Auto Park!");
standard_output.write("> ")

// When user input data and click enter key.
standard_input.on('data', function (data) {
  // User input exit.
  if(data === 'exit\n'){
    // Program exit.
    console.log("Hope you liked it. :)  ");
    process.exit();
  }else
  {
    orchestrate(data.trim().split(/\s+/g))
  }
  standard_output.write("> ")
});

const orchestrate = (args) => {
  switch (args[0].toUpperCase()) {
    case 'PARK':
      park()
      break
    default:
      console.log("It should be either of the following.")
      break
  }
}

const park = (licencePlate, carColor) => {
  // Add a car
  console.log('Alloted parking')
}