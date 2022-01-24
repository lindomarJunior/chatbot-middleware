const express = require('express');
const venom = require('venom-bot');
const apisouce = require('apisauce');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false, // for version not multidevice use false.(default: true)
    autoClose: 0,
    browserArgs: ['--disable-web-security',
		'--no-sandbox',
		'--disable-web-security',
		'--aggressive-cache-discard',
		'--disable-cache',
		'--disable-application-cache',
		'--disable-offline-load-stale-cache',
		'--disk-cache-size=0',
		'--disable-background-networking',
		'--disable-default-apps',
		'--disable-extensions',
		'--disable-sync',
		'--disable-translate',
		'--hide-scrollbars',
		'--metrics-recording-only',
		'--mute-audio',
		'--no-first-run',
		'--safebrowsing-disable-auto-update',
		'--ignore-certificate-errors',
		'--ignore-ssl-errors',
		'--ignore-certificate-errors-spki-list']
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onAnyMessage((message) => {
    console.log("teste2");
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }

    if (message.body === 'teste' && message.isGroupMsg === false) {

      const api = apisouce.create({
          baseURL: 'https://chatbot-whatsapp-lindomar.herokuapp.com' //ip from machine
      });

      api.get('/webhook').then(resp => {
        console.log(resp.problem);
        console.log(resp.data);
        console.log('dentro');
        client
        .sendText(message.from, resp.data)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      });
       
    }
  });
}

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

