# Fare Prediction Deployment

This repository facilitates the deployment of a pre-trained machine learning model designed for angkot fare prediction. Developed using Node.js, it utilizes several libraries and technologies to deliver the necessary functionality. 

## Usage
### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jakas-Technologies/ML-Model-Deployment.git
   ```

2. **Install Node Modules:**
   ```bash
   npm install
   ```

3. **Create .env File:**
   Duplicate the `.env.example` file and name it `.env`. Fill in the configuration values according to your requirements.
   ```env
   # Example .env

   # GCP API Key
   GOOGLE_API_KEY=your_api_key_here

   # Port used by the application
   PORT=3000
   ```
    

4. **Run the Application:**
   ```bash
   npm run dev
   ```

   The application can now be accessed at `http://localhost:3000`.

### Accessing Prediction Endpoint

Once the server is running, you can access the prediction endpoint to estimate fare based on the distance parameter.

#### POST /predict-fare

Submit a POST request with data including origin and destination coordinates.

Request:
```json
{
   "originLat": -6.907192649564511,
   "originLng": 107.56701380695162,
   "destinationLat": -6.897920894672473,
   "destinationLng": 107.59286315024411,
   "passengerType": "Student"
}

```

Response:
```json
{
    "status": "OK",
    "data": {
        "passengerType": "Student",
        "distance": 5517,
        "fare": 4000,
        "fuelPrice": 10000
    }
}
```