'use strict'
const amqp = require('amqplib');

async function consumerOrderedMessage(){
    const connection = await amqp.connect('amqp://guest:12345@localhost')
    const channel = await connection.createChannel();
    
    const queueName = 'ordered-queue-message'
    await channel.assertQueue(queueName,{durable:true})

    // set prefetch

    channel.prefetch(1)

    channel.consume(queueName,msg=>{
        const message = msg.content.toString()
        
        setTimeout(()=>{
            console.log('processed: ',message)
            channel.ack(msg)
        },Math.random() * 1000)
    })
    
}

consumerOrderedMessage().catch(err=> console.error(err))