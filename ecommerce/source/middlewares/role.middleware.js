'use strict'
const { AccessControl } = require ('accesscontrol')
let grantList = [
    { role: 'admin', resource: 'profile', action: 'read:any', attributes: '*, !views' },
    { role: 'admin', resource: 'profile', action: 'read:own', attributes: '*' },
];
module.exports = new AccessControl(grantList)