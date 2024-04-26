'use strict'

const { createComment,getCommentsByParentId,deleteComments } = require('../services/comment.service')
const{ SuccessResponse } = require('../core/success.response')
class CommentController {
    createComment = async (req,res,next)=>{
        new SuccessResponse({
            message:'create new comment',
            metadata:await createComment(req.body)
        }).send(res)
    }

    getCommentsByParentId = async(req,res,next)=>{
        new SuccessResponse({
            message:'get comment id',
            metadata:await getCommentsByParentId(req.query)
        }).send(res)
    }

    deleteComment = async(req,res,next)=>{
        new SuccessResponse({
            message:'deleted comment',
            metadata:await deleteComments(req.body)
        }).send(res)
    }
}

module.exports = new CommentController()