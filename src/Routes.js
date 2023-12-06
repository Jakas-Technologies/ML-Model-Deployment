const FareController = require("./FareController")

class Routes {
    constructor(server){
        this.server = server
        this.router = this.server.router
        this.FareController = new FareController(this.server)

        this.setupRoutes()
    }

    setupRoutes(){
        this.router.get('/', (req,res)=>{
            res.status(200).json({
                status: "OK"
            })
        })

        this.router.post('/predict-fare', this.FareController.getFare.bind(this.FareController))
    }
}

module.exports = Routes