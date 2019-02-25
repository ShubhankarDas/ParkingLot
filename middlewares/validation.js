const commandBlueprint = require('../assets/commandBlueprint.json')

// validate all the inputs before running them
const validation = (args) => {
  // Get the template/blueprint of the command
  let template = commandBlueprint[args[0].toUpperCase()]

  // check the arguments for this command
  if (args.length > template.arguments.length) {
    // total number arguments required for this command
    let length = template.arguments.length

    // iterate over all arguments
    for (let i = 1; i <= length; i++) {
      // get the regex from the template
      let regString = template.arguments[i - 1].regex

      // create a regex from the pattern and flags
      let regEx = new RegExp(regString.pattern, regString.flags)

      // validate if the argument matches the regex format
      if (!args[i].match(regEx)) {
        console.log(template.default_example)
        return false
      }
    }
    return true
  }
  console.log(template.default_example)
  return false
}

module.exports = validation