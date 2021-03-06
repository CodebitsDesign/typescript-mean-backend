import * as mongo from 'mongodb'
import {AppProperties} from "typescript-mean-models/dist/app-properties.model";
import {Db} from "mongodb";
import {log} from "../logger/logger";

export class Database {

  constructor(

  ) {
    this._mongoClient = mongo.MongoClient;
  }

  private _database;
  private _mongoClient;

  private mongoUri = (appParams: AppProperties) => {
    const params = appParams.db;
    return `mongodb://${params.dbuser}:${params.dbpassword}@${params.host}:${params.port}/${params.dbname}`
  };


  public get database() {
    return this._database;
  }

  public connectToDatabase (appConfig: AppProperties, callback?: (database: Db) => any) {

    log.info('Connecting to Database');

    // Connect to the db
    this._mongoClient.connect(this.mongoUri(appConfig), (err, db) => {
      if(!err) {
        log.info('Successfully Connected to Database');
        this._database = db;
        if (callback) {
          callback(db);
        }
      } else {
        log.error('Error while connecting to Database:');
        log.error(err);
      }
    });

  };

}

export const database = new Database();


