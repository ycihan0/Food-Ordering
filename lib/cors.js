import Cors from 'cors';
import initMiddleware from './init-middleware';

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'https://nextjs-food-ordering-j45ym7grx-cs-projects-d247494b.vercel.app', // izin verilen domain
  })
);

export default cors;
