const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/instagram', (req, res) => {
  const access_token = 'Instagram Token'; // replace with your real Instagram Access Token
  
  fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${access_token}`)
    .then(response => response.json())
    .then(data => {
      const imageUrls = data.data
        .filter(item => item.media_type === 'IMAGE')
        .map(item => item.media_url);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(imageUrls);
    })
    .catch(error => {
      console.error('Error fetching Instagram images:', error);
      res.status(500).json({ error: 'Failed to fetch Instagram images' });
    });
});

app.use(express.static('public')); // serve static files from public folder

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`); 
});
