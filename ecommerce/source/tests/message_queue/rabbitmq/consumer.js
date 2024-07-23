'use strict'
const amqp = require('amqplib');

const runConsumer = async()=>{
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        const channel = await connection.createChannel();
        const queueName = 'test-topic'
        await channel.assertQueue(queueName,{durable:true})

        channel.consume(queueName,(messages)=>{
            console.log(`receive ${messages.content.toString()} `)
        },{
            ack:true
        })
    } catch (error) {
        console.error(error)
    }
}
runConsumer().catch(console.error)
