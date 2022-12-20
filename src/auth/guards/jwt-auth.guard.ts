import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// jwt를 사용하는 auth guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
