const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
    title : String,
    description : String,
    time : String,
    stage : Schema.Types.ObjectId,
    user: Schema.Types.ObjectId
});

const Race = mongoose.model('race', raceSchema);
module.exports = Race;
