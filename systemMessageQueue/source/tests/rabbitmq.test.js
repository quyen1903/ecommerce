'use strict'

const { connectToRabbitMQ, connectToRabbitMQForTest } = require('../dbs/init.rabbit')

describe('RabbitMQ Connection', ()=>{
    it('should connect to successful rabbitmq',async()=>{
        const result = await connectToRabbitMQForTest()
        expect(result).toBeUndefined()
    })
})