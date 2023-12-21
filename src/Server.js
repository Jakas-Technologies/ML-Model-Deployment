const dotenv = require('dotenv');
const express = require('express')
const Routes = require('./Routes.js')
const ScraperService = require('./services/ScraperService.js');

class Server {
  constructor(){
    dotenv.config()
    this.env = process.env
    this.ScraperService = new ScraperService()
    this.router = express.Router()
  }

  run(){
    this.APP = express()
    this.APP.use(express.json());  


    new Routes(this)

    this.APP.use(this.router)

    this.APP.listen(this.env.PORT, ()=>{
      console.log(`Server running on port ${this.env.PORT}`);
    })

    this.ScraperService.scheduleDailyUpdate()

  }

}

const serverInstance = new Server()

serverInstance.run()