'use strict'

const{ consummerToQueue } = require('./source/services/consumerQueue.service')
const queueName = 'test-topic'
consummerToQueue(queueName).then((result) => {
    console.log(`message queue started${queueName}`)
}).catch((err) => {
    console.log(`message error ${err.message}`)
});