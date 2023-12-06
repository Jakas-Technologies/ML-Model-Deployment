const DistanceService = require("./DistanceService");
const FareService = require("./FareService");

class FareController {
    constructor(server){
        this.server = server
        this.FareService = new FareService()
        this.DistanceService = new DistanceService(this.server)
    }

    async getFare(req, res){
        try {
            const originLat = parseFloat(req.query.originLat)
            const originLng = parseFloat(req.query.originLng)
            const destinationLat = parseFloat(req.query.destinationLat)
            const destinationLng = parseFloat(req.query.destinationLng)

            const distance = await this.DistanceService.getDistance(originLat, originLng, destinationLat, destinationLng)

            if (isNaN(distance) || distance <= 0){
                return res.status(400).json({
                    status: 'BAD_REQUEST',
                    message: 'Invalid or missing distance parameter'
                })
            }

            const fare = await this.FareService.getFare(distance)

            return res.status(200).json({
                status: 'OK',
                data: {
                    distance: distance,
                    fare: fare
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