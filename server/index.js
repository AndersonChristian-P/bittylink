require("dotenv").config()

const express = require("express")
const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const massive = require("massive")
const session = require("express-session")

const authCtrl = require("./controllers/authCtrl")

// --  MIDDLEWARE -- //
app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1
  }
}))



// -- MASSIVE -- //
massive(CONNECTION_STRING).then((database) => {
  app.set("db", database)
  console.log("database set!")
  console.log(database.listTables())
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
  })
})


// -- ENDPOINTS -- //

// Authentication
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)