//DB설정값 취득
require('dotenv').config();
const {MONGO_ID, MONGO_PASSWORD,MONGO_PORT,CONTAINER_NAME} = process.env;

module.exports ={
    mongoURI:`mongodb://${MONGO_ID}:${MONGO_PASSWORD}@mongodb:${CONTAINER_NAME}/yourcollection?authSource=admin`
}