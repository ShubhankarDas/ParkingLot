const commandBlueprint = require('../assets/commandBlueprint.json')

const validation = (args) => {
  let template = commandBlueprint[args[0].toUpperCase()]

  if (args.length > template.arguments.length) {
    let length = template.arguments.length

    for (let i = 1; i <= length; i++) {
      let regString = template.arguments[i - 1].regex

      let regEx = new RegExp(regString.pattern, regString.flags)

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