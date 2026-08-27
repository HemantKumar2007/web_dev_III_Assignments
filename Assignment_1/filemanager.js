const fs = require("fs")

function fileManager() {
    fs.writeFile("dt.js", "console.log('Hello World');", (err) => {
        if (err) console.log(err)
        else console.log("File Created")
    })

    fs.appendFile("dt.js", "var x = 89;console.log(x);", (err)=>{
        if(err)console.log(err)
            else console.log("File Updated")
    })

    fs.readFile("dt.js","utf8", (err,res)=>{
        if(err)console.log(err)
            else console.log(res)
    })

    fs.unlink("dt.js", (err)=>{
        if(err) console.log(err)
            else console.log("File Deleted")
    })
}
module.exports = { fileManager }