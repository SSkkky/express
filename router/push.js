const pushRouter = require('express').Router();
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
    'mailto:worte5633@gmail.com', // 발송자의 이메일이나 도메인 주소
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

pushRouter.get('/', async function (req, res) {
    res.send('push ready');
})

pushRouter.get('/publicKey', async function (req, res) { // 퍼블릭키는 프론트단에 보내야함
    // res.send(vapidKeys.publicKey);
    res.send(vapidKeys.publicKey);
})
pushRouter.post('/sendNoti', function (req, res) {

    let data = JSON.stringify({msg:'hello pwa'})
  
    setTimeout(function () {
        webpush.sendNotification(req.body.subscribe,data)
        .then(function () {
          res.sendStatus(202);
        })
        .catch(function (error) {
            res.sendStatus(500);
            console.log(error);
        });
    }, 3000);
  
  })

module.exports = pushRouter;