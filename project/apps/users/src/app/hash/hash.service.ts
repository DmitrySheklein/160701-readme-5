import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './hash.const';

@Injectable()
export class HashService {
  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);

    return hash(password, salt);
  }
  public async comparePassword({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }) {
    return compare(password, passwordHash);
  }
}
