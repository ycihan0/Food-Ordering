import Cors from 'cors';
import initMiddleware from './init-middleware';

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'https://nextjs-food-ordering-nine.vercel.app/api', // izin verilen domain
  })
);

export default cors;
