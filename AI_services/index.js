require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
const otpService = require('./otpService')
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');   
const axios = require('axios');
const querystring = require('querystring');
const { count } = require('console');


app.get('', (req, res) => {
  res.status(200).send('AiChatbot....');

});

// const qs = require('qs');

// const url = 'http://127.0.0.1:81';
// const data = qs.stringify({
//   input_text: 'What is Linear Regression?'
// });

// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   timeout: 5000  // optional timeout
// };

// axios.post(url, data, config)
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       console.error('Error Response:', error.response.status);
//       console.error('Error Data:', error.response.data);
//     } else if (error.request) {
//       // Request was made but no response received
//       console.error('Error Request:', error.request);
//     } else {
//       // Something else happened in making the request
//       console.error('Error:', error.message);
//     }
//   });




//translate function 
async function translate(text, langTo, langFrom) {
  const url = process.env.GS_KEY_URL;
  const params = querystring.stringify({
      q: text,
      target: langTo,
      source: langFrom
  });

  try {
      const response = await axios.get(`${url}?${params}`, {
          headers: {
              'User-Agent': 'Mozilla/5.0'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error translating text:', error);
      throw error;
  }
}




app.post('/translate', async (req, res) => {
  let {conversation, targetLang ,sourceLang} = req.body;
  try { let count = 1;
    for (let item of conversation) {
      if (item.type === 'bot_response') {
        if (item.result) {
          item.result = await translate(item.result, targetLang,sourceLang);
        }
        if (item.source) {
          item.source = await translate(item.source, targetLang,sourceLang);
        }
        if (item.Summary) {
          item.Summary = await translate(item.Summary, targetLang,sourceLang);
        }
        // console.log('Translated ',count++,' : ',item.result,'\n',item.Summary,'\n',item.result,'\n');
      }
    }
    res.status(201).send({ translatedConversation: conversation });

  } catch (error) {
    res.status(500).send({ error: 'Translation failed', details: error.message });
  }

});








app.post('/sendOtp', (req, res) => {
    const { email } = req.body;
    otpService.sendOTP(email)
        .then(response => res.status(201).send(response))
        .catch(error => res.status(500).send(error));
});



app.post('/bot-response', async (req, res) => {
    const { text, lang } = req.body;

    try {
        // Make a POST request to the backend service
        console.log("HELLO")
        const backendResponse = await axios.post('http://0.0.0.0:81/', new URLSearchParams({ input_text: text }));
        // console.log("RESP", backendResponse.data)

        // Extract response from backend
        const response = backendResponse.data;
        console.log("RESP-2:  ", response)

        const modifiedResp = 
          {
            "type": "bot_response",
            "sender": "bot",
            "timestamp": "2024-05-07 10:01:00 AM",
            "name": "bot",
            "videoUrl": response.seekTime.video_name + '.mp4', 
            "showBtnflag": true,
            "vflag":false,
            "vtlag":false,
            "Summary": "Summary by Gpt",
            "startTime": response.seekTime,
            "endTime": "00:02:00",
            "result": response.result,
            "seekTime": response.seekTime,
            "source": response.source
          }

        // Check if translation is needed
        if (lang !== 'en') {
            if (modifiedResp.result) {
              modifiedResp.result = await translate(modifiedResp.result, lang, '');
            }
            if (modifiedResp.source) {
              modifiedResp.source = await translate(modifiedResp.source, lang, '');
            }
        }

        // Send the final response
        res.status(201).send({ response: modifiedResp });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});







app.use('/Video', express.static(path.join(__dirname, 'Video')));



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













