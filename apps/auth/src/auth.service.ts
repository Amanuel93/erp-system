import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from '@app/shared/dto';
import { UserRole } from '@app/shared/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, email: string, password: string): Promise<UserDto> {
    const existing = await this.userRepository.findOne({ where: [{ username }, { email }] });
    if (existing) {
      throw new ConflictException('Username or email already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, email, password: hashed });
    const saved = await this.userRepository.save(user);
    return { id: saved.id, username: saved.username, email: saved.email };
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(token: string): Promise<UserDto> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: decoded.sub } });
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return { id: user.id, username: user.username, email: user.email };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
