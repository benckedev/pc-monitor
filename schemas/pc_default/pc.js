var mongoose = require('mongoose'),
    Schema = mongoose.Schema

const pcSchema = new Schema({
    _id: { type: String, required: true },
    pc: { type: Object, required: true },
    printer: { type: Object, required: false, default: { name: 'Nulo' } },
    shutdown: {
        progress: { type: Boolean, required: false, default: false },
        ms: { type: Number, required: false, default: 0 }
    },
    updated: { type: Number, required: false, default: 0 }
});



module.exports = mongoose.model('pc', pcSchema)