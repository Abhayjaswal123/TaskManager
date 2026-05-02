import dotenv from 'dotenv'
dotenv.config();

if(!process.env.PORT){
    console.log("PORT is not exist in your env variables")
}

if(!process.env.MONGO_URI){
    console.log("MONGO_URI does not exist in env variable ");
}

if(!process.env.REFRESH_JWT_SECRET){
    console.log("REFRESH_JWT_SECRET is not exist in your env variables")
}

if(!process.env.ACCESS_JWT_SECRET){
    console.log("ACCESS is not exist in your env variables")
}

if(!process.env.BASE_URL){
    console.log("BASE_URL is not exist in your env variables")
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    REFRESH_JWT_SECRET : process.env.REFRESH_JWT_SECRET,
    ACCESS_JWT_SECRET : process.env.ACCESS_JWT_SECRET,
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT
}

export default config;