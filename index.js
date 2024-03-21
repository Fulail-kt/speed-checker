
import express from 'express'
import fs from 'fs';
import csv from 'csv-parser'
import path from 'path'
import axios from 'axios';

const app = express()

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/calculate', async (req, res) => {
    const speedLimits = [];
    const { street, city, state } = req.body;
    const speed = parseInt(req.body.speed);
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(street, city, state)}`);


    if (response.data[0].display_name.includes('San Francisco')) {
        console.log('The location is within San Francisco.');

        await new Promise((resolve, reject) => {
            fs.createReadStream('./speedLimits.csv').pipe(csv()).on('data', (row) => {
                const speedLimit = parseInt(row['SPEEDLIMIT']);
                const street = row['STREET'];
                const fromSt = row['FROM_ST'];
                const toSt = row['TO_ST'];

                streetName = streetName.replace('street', '').trim();

                const speedLimitObj = {
                    speedLimit,
                    street,
                    fromSt,
                    toSt,
                };

                speedLimits.push(speedLimitObj);


            }).on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            }).on('error', (error) => {
                reject(error);
            });


        });

        // const addressParts = address.split(', ');
        // const street = address[1]
        // console.log(addressParts)

        // setTimeout(()=>{
        const entry = speedLimits.find(limit => {
            if (limit.street == streetName) {
                console.log(limit)
            }
        });

        // },500)


        console.log(entry, "ddd")

    } else {
        console.log('The location is not within San Francisco.');
    }



    res.json(speedLimits)

})

app.listen(3001, () => {

    console.log('server is running')
})


