import express from "express"

const app = express()

app.get("/", (re, res) => {
	res.send("Hello, World!")
})

app.listen(5000, () => {
	console.log(`Server is running at http://localhost:5000`)
})
