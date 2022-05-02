import dotenv from 'dotenv';
dotenv.config();

const origins = [
            `http://localhost:4000`,
          ]

const routes = [
  '/db/search/:value',
  '/db/users/query',
]

const constants = {
    routes, 
    origins
}

export default constants
