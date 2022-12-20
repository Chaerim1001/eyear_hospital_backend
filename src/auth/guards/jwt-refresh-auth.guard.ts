import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// jwt의 refresh token을 사용하는 auth guard
@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
