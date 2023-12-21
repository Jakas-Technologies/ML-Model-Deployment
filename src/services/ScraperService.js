const puppeteer = require('puppeteer');
const fs = require('fs');
const cron = require('node-cron');
const path = require('path');

class ScraperService {
    constructor() {
        this.filePath = path.join(__dirname, '..', 'data', 'fuelPrice.json');;
    }

    async updateFuelPrice() {
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();

        const url = 'https://mypertamina.id/fuels-harga';
        await page.goto(url);

        await page.waitForSelector('#slick-slide03.slick-active');

        const priceProvJawaBarat = await page.evaluate(() => {
            const activeSlideElement = document.querySelector('#slick-slide03.slick-active');

            if (activeSlideElement) {
                const labels = Array.from(activeSlideElement.querySelectorAll('label.text-sm.font-weight-bolder'));

                const labelProvJawaBarat = labels.find(label => label.textContent.includes('Prov. Jawa Barat'));

                if (labelProvJawaBarat) {
                    const priceText = labelProvJawaBarat.nextElementSibling.textContent.trim();

                    const priceValue = parseInt(priceText.replace(/\D+/g, ''), 10);

                    return priceValue;
                }
            }

            return null;
        });

        await browser.close();

        this.saveFuelPriceToFile(priceProvJawaBarat);
    }

    saveFuelPriceToFile(price) {
        const jsonData = { fuelPrice: price };
        fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2));
    }

    async getFuelPriceFromFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData.fuelPrice;
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }

    scheduleDailyUpdate() {
        cron.schedule('0 0 * * *', async () => {
            const currentTime = new Date().toISOString();
            await this.updateFuelPrice();
            console.log(`FUEL PRICE UPDATED at ${currentTime}`);
        });
    }
}

module.exports = ScraperService;