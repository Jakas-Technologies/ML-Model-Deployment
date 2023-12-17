const DistanceService = require("./DistanceService");
const FareService = require("./FareService");
const ScraperService = require("./ScraperService");

class FareController {
    constructor(server){
        this.server = server
        this.FareService = new FareService()
        this.ScraperService = new ScraperService()
        this.DistanceService = new DistanceService(this.server)
    }

    async getFare(req, res){
        try {
            const { originLat, originLng, destinationLat, destinationLng, passengerType } = req.body;

            const distance = await this.DistanceService.getDistance(originLat, originLng, destinationLat, destinationLng)

            if (isNaN(distance) || distance <= 0){
                return res.status(400).json({
                    status: 'BAD_REQUEST',
                    message: 'Invalid or missing distance parameter'
                })
            }

            const bbmPrice = await this.ScraperService.getBbmPrice()
            const fare = await this.FareService.getFare(distance, passengerType, bbmPrice)

            return res.status(200).json({
                status: 'OK',
                data: {
                    passengerType: passengerType,
                    distance: distance,
                    fare: fare,
                    bbmPrice: bbmPrice
                }
            })

        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR',
                message: 'Try again later'
            })
        }
    }

}

module.exports = FareController