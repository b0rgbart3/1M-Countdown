const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is alive');
});

app.get('/api/block-info', async (req, res) => {
  try {
    const response = await axios.get('https://mempool.space/api/blocks/tip/height');
    const blockHeight = parseInt(response.data);
    
    if (isNaN(blockHeight)) {
      throw new Error('Invalid block height received from API');
    }

    const countdown = 1000000 - blockHeight;

    res.json({
      'block height': blockHeight,
      countdown: countdown
    });
  } catch (error) {
    console.error('Error fetching block height:', error.message);
    res.status(500).json({ error: 'Failed to fetch block height' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
