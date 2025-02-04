import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../entities/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(count: number = 610): Promise<void> {
    const users = [];

    for (let i = 0; i < count; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const password = '12345677';

      users.push(
        this.userRepository.create({
          name,
          email,
          password,
        }),
      );
    }

    await this.userRepository.save(users);
    console.log(`${count} usuários foram criados com sucesso!`);
  }
}

export default UserSeederService;
