'use strict'

const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'quyen',
    password:'123456',
    database:'shopDEV'
})

const batchSize = 100000;
const totalSize = 1000000;

let currentId = 1;
const insertBatch = ()=>{
    const values = [];
    for (let i=0; i<batchSize && currentId <= totalSize; i++){
        const element = array[i]
    }
}
// pool.query('SELECT * from users',function (err, results){
//     if(err) throw err

//     console.log('query result: ',results)

//     pool.end(err=>{
//         if (err) throw err
//         console.log(`connect closed`)
//     })
// })  