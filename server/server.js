import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connectDB } from "./db/connectDB.js"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"

dotenv.config()

const app = express()

app.use(cors())

app.get("/", (req, res) => {
	res.send("Hello, World!")
})

// routes
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

app.listen(5000, () => {
	connectDB()
	console.log(`Server is running at http://localhost:5000`)
})
