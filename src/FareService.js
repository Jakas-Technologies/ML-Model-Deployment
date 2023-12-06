const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const norm_params = require('./fare_model/normalization_params.json')

class FareService {

    async getFare(distance){
        const distance_normalized = (distance - norm_params.mean_X) / norm_params.std_X;

        const modelPath = path.join('C:', 'Bangkit', 'Bangkit', 'Capstone Project', 'Model_Deployment', 'Project-1', 'fare_model', 'model.json');
        const model = await tf.loadLayersModel(`file://${modelPath}`);

        const input = tf.tensor2d([distance_normalized], [1, 1]);
        const result = model.predict(input);

        const result_denormalized = tf.add(tf.mul(result, norm_params.std_y), norm_params.mean_y);

        const resultValues = result_denormalized.dataSync();

        const roundedValues = resultValues.map(value => Math.round(value  / 1000) * 1000);

    return roundedValues[0];
    }

}

module.exports = FareService