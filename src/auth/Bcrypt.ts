import * as bcrypt from 'bcrypt'

export class PasswordCryptographer {

  private get saltRounds() {
    return 10;
  }

  public doHash (plaintextPassword: string): Promise<string> {
    return bcrypt.hash(plaintextPassword, this.saltRounds);
  };

  public doCompare (plaintextPassword, hash): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hash);
  };

}

export default new PasswordCryptographer();
