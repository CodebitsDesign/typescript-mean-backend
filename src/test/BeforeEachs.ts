import {appConfig} from "../config/AppConfig";
import {database} from "./../db/Database";
import {Db} from "mongodb";
import {log} from "../logger/logger";
import 'mocha';

export class BeforeEach {

  public connectTestToDatabase() {
    return beforeEach('connect to db', (done) => {
      appConfig.setAppConfig('test');
      database.connectToDatabase(appConfig.appConfig, (db: Db) => {
        log.info(db.databaseName);
        done();
      })
    });
  }
}

export const beforeEachDo = new BeforeEach();