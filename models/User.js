const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        unique : 1,
        maxlength: 15,
        required: true
    },
    password: {
        type: String,
        minlength:5,
        required: true
    },
    email: {
        type: String,
        trim: true, //스페이스를 없애는 역할
        unique : 1,
        required: true
    },
    birth:{
        type: Date,
        required: true
    },
    wish_list:{
        type: Array
    },
    token:{
        type: String,
    },
    tokenExp:{
        type: Number
    },
    role: {
        type: Number,
        default :0
    },
});


/**
 * DB저장시 비밀번호 암호화
 */
userSchema.pre('save',(next)=>{
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err,salt)=>{
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err,hash)=>{
                if(err) return next(err);
                user.password = hash;
                next()
            });
        });
    }else{
        next();
    }
})

/**
 * 비밀번호 일치여부 확인
 * @param {string} plainPassword 입력된 비밀번호
 * @param {function} cb 콜백
 */
userSchema.methods.comparePassword = (plainPassword,cb)=>{
    bcrypt.compare(plainPassword, this.password,(err, isMatch)=>{
        if(err) return cb(err)
        cb(null,isMatch)
    })
}


/**
 * 토큰 생성함수
 * @param {function} cb 콜백
 */
userSchema.methods.generateToken = (cb)=>{
    const user = this;
    
    const token = jwt.sign(user.user_id.toHexString(),'secretToken');
    user.token = token;
    user.save(()=>{
        if(err) return cb(err);
        cb(null,user);
    });
}

/**
 * 토큰 일치여부 확인
 * @param {string} token 토큰
 * @param {function} cb 콜백
 */
userSchema.static.findByToken = (token,cb)=>{
    const user = this;

    jwt.verify(token, 'secretToken', (err,decoded)=>{
        user.findOne({"user_id":decoded, "token":token},(err,user)=>{
            if(err) return cb(err);
            cb(null,user);
        })
    })
}


const User = mongoose.model('User',userSchema);

module.exports = {User}