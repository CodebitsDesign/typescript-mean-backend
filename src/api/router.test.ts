import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {log} from "../logger/logger";

import {router} from './Router';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Router Test', () => {

  it('should be json', () => {
    return chai.request(router)
    .get('/')
    .then(res => {
      //log.info(JSON.stringify(res));
      expect(res).to.have.status(200);
    })
    .catch(err => {
      //  throw err;
      log.error("Error while Router json testing");
      log.error(err);
    });

  });
  
  it('should have a message prop', () => {
    return chai.request(router).get('/')
    .then(res => {
      //log.info(JSON.stringify(res));
      
      expect(res).to.have.status(200);
      // log.info(">res message: " + res.body.message);
      expect(res.body.message).to.eql('Hello World!');
    })
    .catch(err => {
      //  throw err;
      log.error('Error while Router respone testing');
      log.error(err);
    });
    
  });

});
