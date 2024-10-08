import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
