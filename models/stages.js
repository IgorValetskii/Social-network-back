const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    league: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const Stage = mongoose.model('stage', stageSchema);
module.exports = Stage;
