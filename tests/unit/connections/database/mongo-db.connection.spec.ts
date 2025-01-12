import { describe, it } from 'mocha';
import MongoDbConnection from '../../../../src/connections/database/mongo-db.connection';
import { chai, sinon } from '../../helpers/test-helper';

describe('MongoDbConnection', () => {
  const connection = MongoDbConnection;
  const port: number = 27017;
  const schema: string = 'request-monitor';
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(MongoDbConnection, 'createConnection')
      .resolves(true);
  });

  after(() => {
    sandbox.restore();
  });

  it('Should establish a database connection', async () => {
    chai.expect(await connection.createConnection(port, schema))
      .to.equal(true);
  });
});
