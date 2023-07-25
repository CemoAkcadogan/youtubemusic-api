const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const options = {
  method: 'GET',
  url: 'https://youtube-music-api-detailed.p.rapidapi.com/get_watch_playlist',
  params: {
    video_id: '1A7Qw88As64'
  },
  headers: {
    'X-RapidAPI-Key': 'd5e5da8e25mshc45c6ca93738f18p18ec48jsn3f308e348784',
    'X-RapidAPI-Host': 'youtube-music-api-detailed.p.rapidapi.com'
  }
};

app.get('/', async (req, res) => {
  try {
    const response = await axios.request(options);
    const data = response.data;

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>YouTube Music API Örneği</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
            }
            h1 {
              text-align: center;
              padding: 20px;
              background-color: #333;
              color: #fff;
            }
            h2 {
              padding: 10px;
              background-color: #444;
              color: #fff;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              padding: 10px;
              border-bottom: 1px solid #ccc;
              background-color: #fff;
            }
            li:last-child {
              border-bottom: none;
            }
          </style>
        </head>
        <body>
          <h1>YouTube Music API Örneği</h1>
          <h2>Watch Playlist</h2>
          <ul>
    `;

    data.tracks.forEach((track) => {
      html += `<li>${track.title} - ${track.artists.map((artist) => artist.name).join(', ')}</li>`;
    });

    html += `
          </ul>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
