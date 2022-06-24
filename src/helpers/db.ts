import mongoose from 'mongoose';
import mongodb, { MongoClientOptions} from 'mongodb'
import env, { env_global } from '../helpers/env'

const Schema = mongoose.Schema;

interface ConnectOptions extends MongoClientOptions {
    /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
    bufferCommands?: boolean;
    /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
    dbName?: string;
    /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    user?: string;
    /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    pass?: string;
    /** Set to false to disable automatic index creation for all models associated with this connection. */
    autoIndex?: boolean;
    /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
    autoCreate?: boolean;
  }


const port = env_global['DB_PORT']
const db = env_global['DB_NAME']
const container = env_global['DB_CT_NAME'] 

const connectionOptions: ConnectOptions = {
    bufferCommands: true,
    autoIndex: true,
    autoCreate: true,
    user: env_global['DB_ROOT_KEY'],
    pass: env_global['DB_ROOT_SECRET'],
    dbName: db
}

const uri = `mongodb://${container}:${port}`;

mongoose.connect(env_global['MONGODB_URI'] || uri  , connectionOptions );
mongoose.Promise = global.Promise;


import account_model from '../models/account.model'
import refresh_model from '../models/refreshToken.model'
import timeseries_model from '../models/timeseries.model'

export default {
    Account: account_model,
    RefreshToken: refresh_model,
    TimeSeries: timeseries_model,
    isValidId
};

function isValidId(id:string) {
    return mongoose.Types.ObjectId.isValid(id);
}