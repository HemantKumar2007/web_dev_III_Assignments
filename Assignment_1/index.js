// Calculator
// Importing calculator.js to use the function present inside that module.
const math = require("./calculator")
console.log()
console.log("Calculator Started")
console.log()

// Storing the user input in variable a and b

const calculation = process.argv[2]
const a = process.argv[3]
const b = process.argv[4]

console.log("Operation:", calculation)
console.log()
console.log("First Input:", a)
console.log()
console.log("Second Input:", b)
console.log()

// Error Handling and code execution
if (calculation !== "add" && calculation !== "sub" && calculation !== "mul" && calculation !== "div") {
    console.log("Invalid operation. Use add, sub, mul, or div.")
} else {
    if (a === undefined || b === undefined) {
        console.log("Please Enter Both Inputs")
    } else if (isNaN(a) || isNaN(b)) {
        console.log("Please Enter Valid Numerical Value")
    } else {
        if (calculation === "add") {
            console.log("Sum of", a, "&", b, "is", math.add(a, b))
        } else if (calculation === "sub") {
            console.log("Difference of", a, "&", b, "is", math.sub(a, b))
        } else if (calculation === "mul") {
            console.log("Product of", a, "&", b, "is", math.mul(a, b))
        } else if (calculation === "div") {
            console.log("Quotient of", a, "&", b, "is ", math.div(a, b))
        }
    }
}

//-----------------------------------------------------------------

// isEven Module

// const checkEven = require("./modules/isEven")

// console.log()
// console.log("Even Number Checker Started")
// console.log()
// const a = Number(process.argv[2])
// console.log("Input received:", a)
// console.log()

// if (Number.isInteger(a)) {
//     console.log("Valid integer input")
//     console.log()
//     console.log(checkEven.isEven(a))
// } else {
//     console.log("Invalid Input")
//     console.log("Please Enter Again")
// }
// console.log()
// console.log("Even Number Checker Finished")

//-----------------------------------------------------------------

// HTTP SERVER

const server = require("./server")

//-----------------------------------------------------------------

// fs MODULE

const fs = require("./fileManager")
fs.fileManager()

//-----------------------------------------------------------------

// Dice Generator

const dice = require("./dice")

console.log("Dice Generator Started")


for (let i = 0; i < 5; i++) {
    console.log()
    console.log("Starting Dice Roll", i + 1)
    console.log()
    dice.Dice()
    console.log()
    console.log("Dice Roll Completed", i + 1)
}
console.log()
console.log("Dice Generator Finished")