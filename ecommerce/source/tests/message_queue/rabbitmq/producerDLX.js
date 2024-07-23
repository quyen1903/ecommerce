'use strict'
const amqp = require('amqplib');

const runProducer = async()=>{
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        const channel = await connection.createChannel();
        
        const notificationExchange = 'notificationEx'
        const notiQueue = 'notificationQueueProcess'
        const notificationExchangeDLX = 'notificationEx DLX'
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'

        /**
         * 1 create exchange
         */
        await channel.assertExchange(notificationExchange, 'direct', { durable:true })

        /**
         * 2 create queue
         * exclusive false means allows other connection access to same queue
         */
        const queueResult = await channel.assertQueue(notiQueue, {
            exclusive: false,
            deadLetterExchange:notificationExchangeDLX,
            deadLetterRoutingKey:notificationRoutingKeyDLX
        })

        await channel.bindQueue(queueResult.queue, notificationExchange)

        const msg = 'a new product'
        console.log(`producer msg::`,msg)
        await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {expiration:'10000'})

        setTimeout(() => {
           connection.close();
           process.exit(0) 
        }, 500);
    } catch (error) {
        console.error(error)
    }
}
runProducer().catch(console.error)
