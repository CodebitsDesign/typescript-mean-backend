// Configure Express middleware.

// Creates and configures an ExpressJS web server.
import * as bodyParser from 'body-parser';
export class Middleware {

  public addBodyParser(express): void {
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({ extended: false }));
  }
}

export const middleware = new Middleware();
