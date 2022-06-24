import dotenv from 'dotenv'
import path from 'path';

dotenv.config({path: path.join(__dirname, '..','..','.env')})

export const secret = process.env['API_SECRET']
export const key = process.env['API_KEY']
export const port = process.env['API_PORT']

export const env_global = process.env

export default {
    port,
    key,
    secret
}