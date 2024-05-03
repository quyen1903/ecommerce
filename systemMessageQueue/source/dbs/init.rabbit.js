'use strict'

const amqp = require('amqplib')

const connectToRabbitMQ = async()=>{
    try {
        const connection = await amqp.connect('amqp://localhost')
        if(!connection) throw new Error('connect not established')

        const channel = await connection.createChannel()

        return {channel, connection}
    } catch (error) {
        console.error(error)
        throw new Error
    }
}

const connectToRabbitMQForTest = async ()=>{
    try {
        const {channel, connection} = await connectToRabbitMQ()

        const queue = 'test-queue'
        const message = 'hello, developer by quyen'
        await channel.assertQueue(queue)
        await channel.sendToQueue(queue, Buffer.from(message))
        await connection.close()
    } catch (error) {
        console.error('error connecting to rabbitMQ, error')
    }
}

/**
 * 1 find user follow that shop
 * 2 send message to user 
 * 3 yes, ok ====. success
 * 4 error, set death letter exchange
 */
const consummerQueue = async (channel,queueName)=>{
    try {
        await channel.assertQueue(queueName, {durable:true})
        console.log(`waiting for messages ...`)
        channel.consume(queueName,msg=>{
            console.log(`receive message:${queueName}::`,msg.content.toString())
        },{
            noAck:true
        })
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = { connectToRabbitMQ, connectToRabbitMQForTest, consummerQueue }