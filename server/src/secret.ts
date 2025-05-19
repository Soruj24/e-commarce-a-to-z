import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce';
const API_SECRET = process.env.API_SECRET
const API_KEY = process.env.API_KEY
const CLOUD_NAME = process.env.CLOUD_NAME
const jwtAccessKey = process.env.JWT_ACCESS_KEY || '89t94538t945ti4530tu9345ti50t9845tu549086'
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || '89t94538t945ti4530tu934655yt456t345tr43r5ti50t9845tu549086'

export { PORT, MONGO_URI, API_SECRET, API_KEY, CLOUD_NAME, jwtAccessKey, jwtRefreshKey };