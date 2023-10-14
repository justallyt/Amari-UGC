import mongoose, { Schema } from "mongoose";

const notificationsSchema = mongoose.Schema({
        notification_type: {
               type: String,
               required: true
        },
        sender: {
               senderId: {    
                      type: Schema.Types.ObjectId,
                      ref: 'User'
               },
               senderName: { type: String},
               senderMsg: { type: String},
               isRead: { type: Boolean, default: false},
               profilePhoto: { type: String }
        },
        receipient: {
               receipientId: { 
                    type: Schema.Types.ObjectId,
                    ref: 'User'
               },
               receipientName: { type: String},
               receipientMsg: { type: String },
               isRead: { type: Boolean, default: false},
               profilePhoto: { type: String }
        },
}, { timestamps: true })

const Notifications = mongoose.model('Notifications', notificationsSchema);

export default Notifications