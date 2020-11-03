//DB설정값 취득
require('dotenv').config();
const {MONGO_ID, MONGO_PASSWORD,MONGO_PORT} = process.env;

module.exports ={
    mongoURI:`mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}`
}