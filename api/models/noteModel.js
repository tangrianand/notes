const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    attachment: String,
    reminder: String,
    reminderFlag: {type:Boolean, default:false}
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);