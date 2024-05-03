'use strict'

const { consummerQueue, connectToRabbitMQ} = require('../dbs/init.rabbit')

const messageService = {
    consummerToQueue: async (queueName)=>{
        try {
            const { channel,connection } = await connectToRabbitMQ()
            await consummerQueue(channel, queueName)
        } catch (error) {
            console.error(`error consumerToQueue`,error)
        }
    }
}
module.exports = messageService