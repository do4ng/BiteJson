const fs = require("fs")
const { Bite } = require("./dist/index")

const bite = new Bite(fs.readFileSync("./test.json").toString())

bite.set("name", "COOLNAME")
bite.remove("age")
bite.set("about", "Hello, World!")

bite.set("about", 50) // Error

console.log(bite.get())