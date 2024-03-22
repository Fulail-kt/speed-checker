
import express from 'express'
import fs from 'fs';
import csv from 'csv-parser'
import path from 'path'
import axios from 'axios';

const app = express()

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home')
})

app.post('/calculate', async (req, res) => {

    const { street, city, state, speed } = req.body;

    console.log(req.body)

    const address = `${street}, ${city}, ${state}`;

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);

        if (response.data.length > 0 && response.data[0].display_name.includes('San Francisco')) {
          
            const speedLimits = await readSpeedLimits();

            
            const st=street.split(" ")
            
            const streetName=st[1]
            
            const entry = speedLimits.find(limit => limit.street == streetName);
        
            const speedLimit = entry ? (entry.speedLimit === 0 ? 25 : entry.speedLimit) : 25;

            if (speed > speedLimit) {
                res.status(200).json({ message:'You are above the speed limit! Please slow down and drive safely!', color: 'red' });
            } else {
                res.status(200).json({ message:'Thanks for driving safe!', color: 'green' });
            }
        } else {
            res.status(200).json({ message: "We don't have speed data for your location. Drive safe anyways!", color: '#becc1f' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// to check the speed limits
async function readSpeedLimits() {
    return new Promise((resolve, reject) => {
        const speedLimits = [];
        fs.createReadStream('./speedLimits.csv').pipe(csv()).on('data', (row) => {
                const speedLimit = parseInt(row['SPEEDLIMIT']) || 0;
                const street = row['STREET'];
                const fromSt = row['FROM_ST'];
                const toSt = row['TO_ST'];

                speedLimits.push({ speedLimit, street, fromSt, toSt });
            })
            .on('end', () => {
            console.log('csv processed')
                resolve(speedLimits);
            })
            .on('error', (error) => {
                console.error("some err while csv reading",error)
                reject(error);
            });
    });
}

app.listen(3001, () => {

    console.log('server is running')
})


