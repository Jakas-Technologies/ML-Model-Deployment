const dotenv = require('dotenv');
const express = require('express')
const Routes = require('./Routes.js')

class Server {
  constructor(){
    dotenv.config()
    this.env = process.env

    this.router = express.Router()
  }

  run(){
    this.APP = express()

    new Routes(this)

    this.APP.use(this.router)

    this.APP.listen(this.env.PORT, ()=>{
      console.log(`Server running on port ${this.env.PORT}`);
    })

  }

}

const serverInstance = new Server()

serverInstance.run()