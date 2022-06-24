/* import Datastar from 'datastar'; */
import { datastar } from 'datastar';

/* const datastar = new Datastar({
  config: {
    credentials: {
      username: 'cassandra',
      password: 'cassandra',
    },
    keyspace: 'a_fancy_keyspace',
    contactPoints: ['127.0.0.1', 'host2', 'host3'],
  },
}).connect();
 */
const cql = datastar.schema.cql;
const schema = datastar.schema
  .object({
    test_id: cql.uuid(),
    name: cql.text(),
    create_date: cql.timestamp({ default: 'create' }),
    update_date: cql.timestamp({ default: 'update' }),
    members: cql.set(cql.text()),
    related_artists: cql.set(cql.uuid()).allow(null),
    traits: cql.set(cql.text()),
    metadata: cql.map(cql.text(), cql.text()).allow(null),
  })
  .partitionKey('test_id');

export default datastar.define('xrpl', {
  ensureTables: true,
  schema: schema,
});
