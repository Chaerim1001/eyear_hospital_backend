import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 아이어 로컬 서비스 내의 auth를 담당하는 guard
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
