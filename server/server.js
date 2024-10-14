import path from "node:path"
import express from "express"
import dotenv from "dotenv"
import passport from "passport"
import session from "express-session"
// import cors from "cors"

import "./passport/github.auth.js"

import { connectDB } from "./db/connectDB.js"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

const app = express()

// middlewares
app.use(
	session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
)
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())

// app.use(cors())

app.get("/", (req, res) => {
	res.send("Hello, World!")
})

// routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

// production
app.use(express.static(path.join(__dirname, "/client/dist")))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.listen(PORT, () => {
	connectDB()
	console.log(`Server running on http://localhost:${PORT}`)
})
