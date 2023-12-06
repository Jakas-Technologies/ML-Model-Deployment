const express = require('express')
const Routes = require('./Routes.js')

class Server {
  constructor(){
    this.router = express.Router()
    this.PORT = 3333
  }

  run(){
    this.APP = express()

    new Routes(this)

    this.APP.use(this.router)

    this.APP.listen(this.PORT, ()=>{
      console.log(`Server running on port ${this.PORT}`);
    })

  }

}

const serverInstance = new Server()

serverInstance.run()