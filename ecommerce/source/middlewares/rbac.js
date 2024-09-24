'use strict'

const { AuthFailureError } = require ('../core/error.response');
const rbac = require('./role.middleware');

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const rol_name = req.query.role
      if (!rol_name) throw new AuthFailureError('Role not provided');
      
      const permission = rbac.can(rol_name)[action](resource);
      
      if (!permission.granted) throw new AuthFailureError('You do not have enough permission...');
      
      next();  // Ensure you call next() on success to pass control to the next middleware
    } catch (error) {
      next(error);
    }
  };
};
module.exports = { grantAccess }