'use strict'

const{ consummerToQueue,consummerToQueueFailed,consummerToQueueNormal } = require('./source/services/consumerQueue.service')
const queueName = 'test-topic'
// consummerToQueue(queueName).then((result) => {
//     console.log(`message queue started${queueName}`)
// }).catch((err) => {
//     console.log(`message error ${err.message}`)
// });

consummerToQueueNormal(queueName).then(() => {
    console.log(`message consummerToQueueNormal started`)
}).catch((err) => {
    console.log(`message error ${err.message}`)
});

consummerToQueueFailed(queueName).then(() => {
    console.log(`message consummerToQueueNormal started`)
}).catch((err) => {
    console.log(`message error ${err.message}`)
});