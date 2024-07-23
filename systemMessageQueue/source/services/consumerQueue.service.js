'use strict'

const { consummerQueue, connectToRabbitMQ } = require('../dbs/init.rabbit')

const messageService = {
    consummerToQueue: async (queueName)=>{
        try {
            const { channel,connection } = await connectToRabbitMQ()
            await consummerQueue(channel, queueName)
        } catch (error) {
            console.error(`error consumerToQueue`,error)
        }
    },
    consummerToQueueNormal:async (queueName)=>{
        try {
            const { channel,connection } = await connectToRabbitMQ()
            const notiQueue = 'notificationQueueProcess'

            // const timeExpired = 15000
            // setTimeout(()=>{
            //     channel.consume(notiQueue, msg =>{
            //         console.log(`send notification queue successfully processed`, msg.content.toString())
            //         channel.ack(msg)
            //     })
            // },timeExpired)

            channel.consume(notiQueue, msg =>{
                try {
                    const numberTest = Math.random()
                    console.log({numberTest})
                    if (numberTest <0.8) throw new Error('send notification failed, HOT FIX')
                    console.log(`send notification queue successfully processed`, msg.content.toString())
                    channel.ack(msg)//
                } catch (error) {
                    // console.error('send notification error',error)
                    channel.nack(msg, false, false)
                }

            })

        } catch (error) {
            console.error(`error consummerToQueueNormal`,error)
        }
    },

    consummerToQueueFailed:async(queueName)=>{
        try {
            const { channel,connection } = await connectToRabbitMQ()
            
            const notificationExchangeDLX = 'notificationExchangeDLX'
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'
            const notiQueueHandler = 'notificationQueueHotFix'  

            await channel.assertExchange(notificationExchangeDLX, 'direct',{durable:true})

            const queueResult = await channel.assertQueue(notiQueueHandler, {exclusive:false})

            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)
            await channel.consume(queueResult.queue, msgFailed=>{
                console.log('this is notification error, please hot fix', msgFailed.content.toString())
            },{
                noAck:true
            })

        } catch (error) {
            console.error(`error consummerToQueueFailed`,error)
        }
    }

}
module.exports = messageService