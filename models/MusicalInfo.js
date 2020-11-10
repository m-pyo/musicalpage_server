const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

//자동채번 
autoIncrement.initialize(mongoose);

const {Schema} = mongoose;

const MusicalInfoSchema = new Schema({
    musical_id:{
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    link:{
        type: String,
        default: null
    },
    start_date:{
        type: Date,
        default: null
    },
    end_date:{
        type: Date,
        default: null
    },
    img_path:{
        type: String,
        default: null
    },
    createAt:{
        type: Date,
        default: Date.now
    },    
    del_flg:{
        type: Number,
        default: 0
    },
})

//자동채번 설정
MusicalInfoSchema.plugin(autoIncrement.plugin,{ 
    model : 'musical_info', 
    field : 'musical_id', // auto-increment할 field
    startAt : 1, //초기값
    increment : 1 //증가값
});

module.exports = mongoose.model('musical_info',MusicalInfoSchema);