const axios = require('axios');

class DistanceService {
    constructor() {
        this.apiKey = 'AIzaSyAttBc9n2uWPiFJ9B79kRsDVU1s6MkdEUs';
    }

    async getDistance(orgLat, orgLng, dLat, dLng) {
        const apiKey = this.apiKey;
        const originLat = orgLat;
        const originLng = orgLng;
        const destinationLat = dLat;
        const destinationLng = dLng;

        const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const distance = response.data.rows[0].elements[0].distance.value;
            return distance;
        } catch (error) {
            console.error(error.message);
            throw error; 
        }
    }

}

module.exports = DistanceService;
