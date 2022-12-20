import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginHospitalDto } from '../dto/login-hospital.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'hospitalId',
    });
  }

  async validate(hospitalId: string, password: string): Promise<any> {
    const authDto: LoginHospitalDto = {
      // 요청 데이터에서 hospitalId과 password를 가져온다.
      hospitalId: hospitalId,
      password: password,
    };

    const hospital = await this.authService.validateHospital(authDto);
    if (!hospital) {
      // 가입된 병원이 아닌 경우 에러를 발생시킨다.
      throw new UnauthorizedException();
    }
    return hospital;
  }
}
