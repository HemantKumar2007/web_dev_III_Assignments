const http = require("http")

const server = http.createServer((req, res) => {
    console.log()
    console.log("Request received")
    console.log()
    console.log("Requested URL:", req.url)
    console.log()
    if (req.url === "/") {
        console.log("Home route selected")

        res.write("<h1>Welcome To Home Page</h1><br>")
        res.write("<h2>There is nothing more to see on this page , Now move to next page </h2>")
        res.end()
        console.log()
        console.log("Home response sent")
    }
    else if (req.url === "/about") {
        console.log("About route selected")

        res.write("<h1>About Page</h1><br>")
        res.write("<h2>Assignment One</h2><br>")
        res.write("<h3>Task-3</h3><br>")
        res.write("<h4>Creating Basic HTTP Server</h4>")
        res.end()

        console.log()
        console.log("About response sent")
    }
    else if (req.url === "/contact") {
        console.log("Contact route selected")

        res.write("<h1>Contact Page</h1><br>")
        res.write("<h4>Ph:45678</h4><br>")
        res.write("<h4>email : Don't mail me</h4>")
        res.end()

        console.log()
        console.log("Contact response sent")
    } else {
        console.log("Invalid route received")

        res.statusCode = 404
        res.write("<h1>Invalid Route</h1>")
        res.end()

        console.log("404 response sent")
    }


})
server.listen(3000, () => {
    console.log("Server is running on Port 3000")
})

module.exports = { server }