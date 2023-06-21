
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const Car = require('./models/car');
const app = express();

app.use(cors());


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
//mongodb://127.0.0.1:27017/DormCritique
const db_url = process.env.DB_URL;
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.post('/api/cars', async (req, res, next) => {
    try {
        const carData = req.body;
        const car = new Car(carData);
        const savedCar = await car.save();
        res.status(201).json(savedCar);
    } catch (error) {
        next(error);
    }
});

app.get('/api/cars', async (req, res) => {
    const { sortBy, page, pageSize } = req.query;

    let sortQuery = {};
    let filterQuery = {}; // Declare filterQuery object

    if (sortBy) {
        const sortFields = sortBy.split(',');

        sortFields.forEach((sortField) => {
            console.log(sortField);
            if (sortField === 'sortby:VehicleAtoZ') {
                sortQuery.Name = 1;
            } else if (sortField === 'sortby:VehicleZtoA') {
                sortQuery.Name = -1;
            } else if (sortField === 'sortby:PriceHightoLow') {
                sortQuery.Price = -1;
            } else if (sortField === 'sortby:PriceLowtoHigh') {
                sortQuery.Price = 1;
            }
        });
    }
    const nameFilter = sortBy && sortBy.includes('Name:') ? sortBy.split('Name:')[1].split(',')[0] : null;    
    const ConditionFilter = sortBy && sortBy.includes('Condition:') ? sortBy.split('Condition:')[1].split(',')[0] : null;    
    const YearFilter = sortBy && sortBy.includes('Year:') ? sortBy.split('Year:')[1].split(',')[0] : null;    
    const CylinderFilter = sortBy && sortBy.includes('Cylinders:') ? sortBy.split('Cylinders:')[1].split(',')[0] : null;

    console.log(CylinderFilter)

    const keywordFilter = sortBy && sortBy.includes('keyword:') ? sortBy.split('keyword:')[1].toLowerCase() : null;

    if (keywordFilter) {
        filterQuery.Name = { $regex: keywordFilter, $options: 'i' };
    }

    if (ConditionFilter) {
        filterQuery.Condition = ConditionFilter;
    }
    if (CylinderFilter) {
        filterQuery.Cylinders = CylinderFilter;
    }

    if (YearFilter) {
        filterQuery.Year = YearFilter;
    }

    if (nameFilter) {
        if (keywordFilter && nameFilter) {
            const commonWords = keywordFilter.split(' ').filter((word) => nameFilter.includes(word));

            if (commonWords.length > 0) {
                filterQuery.Name = nameFilter;
            }
            else{
                
            } 
            
        }
        else{
            filterQuery.Name = nameFilter;

        }
            

        
    }


    try {
        const totalCars = await Car.countDocuments(filterQuery);
        console.log(filterQuery);
        console.log(sortQuery);
        let carsQuery = Car.find(filterQuery).skip((page - 1) * pageSize).limit(parseInt(pageSize, 10));
        if (Object.keys(sortQuery).length > 0) {
            if (sortQuery.Price) {
                carsQuery = carsQuery.sort({ Price: sortQuery.Price }).collation({ locale: 'en_US', numericOrdering: true });
            } else {
                carsQuery = carsQuery.sort(sortQuery);
            }
        }

        const paginatedCars = await carsQuery;

        res.json({
            totalCars,
            cars: paginatedCars,
        });
    } catch (error) {
        console.error('Failed to retrieve cars:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(5000, () => {
    console.log('Serving on port 5000')
})