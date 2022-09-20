const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const router = express.Router();
let cacheData;
let cacheTime;

const limiter = rateLimit({
    windowsMs: 60 * 1000,
    max: 3
});

router.get('/', limiter, async (req, res, next) => {
    if (cacheTime && cacheTime < (Date.now() - 30 * 1000)) {
        return res.json(cacheData);
    }
    try {
        const { data } = await axios.get('https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=pk.eyJ1Ijoicm9tYWluYmFiYSIsImEiOiJjbDZycGFlOXowbXM0M2pwaW1xNDNheWR5In0._ZmtN18xQr68pIYeZiCn5g');
        cacheData = data;
        cacheTime = Date.now();
        data.cacheTime = cacheTime;
        return res.json(data);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
