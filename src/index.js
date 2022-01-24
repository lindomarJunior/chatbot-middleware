const express = require('express');
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false, // for version not multidevice use false.(default: true)
    args: ['--no-sandbox']
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
  });
}

console.log("teste1");

