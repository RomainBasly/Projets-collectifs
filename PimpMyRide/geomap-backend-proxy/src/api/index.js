const express = require('express');

const emojis = require('./emojis');
const geomapJS = require('./geomap');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/geomap/', geomapJS);

module.exports = router;
