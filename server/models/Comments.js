import mongoose, { Schema } from 'mongoose'

const commentSchema = mongoose.Schema({
         asset_id: {
                 type: Schema.Types.ObjectId,
                 ref: 'Asset'
         },
        commenter: {
                commenter_id: {
                       type: Schema.Types.ObjectId,
                       ref: 'User'
                },
                name: { type: String, required: true},
                photo: { type: String}
        },
        comment: { 
                type: String,
                required: true
        },
        replies: [
            {
                   reply_id: {type: String},
                   comment_id: { type: Schema.Types.ObjectId, ref: 'Comment'},
                   replier: { type: Schema.Types.ObjectId, ref: 'User'},
                   reply: { type: String},
                   name: { type: String},
                   photo: { type: String}
            }
        ]
}, { timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment