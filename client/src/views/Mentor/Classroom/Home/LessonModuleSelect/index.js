require('dotenv').config();

const fs = require('fs');
const axios = require('axios');

async function transcribe(file) {
  const response = await axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      file,
      model: 'whisper-1'
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.text;
}

async function calltranscribe() {
  const file = fs.createReadStream('Like Father, Like Son _ LiMu Emu & Doug _ Liberty Mutual Insurance Commercial');
  const transcript = await transcribe(file);

  console.log(transcript);
}

calltranscribe();