import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //  jwt로 생성해서 클라이언트 측으로 보냈던 Token 값을 헤더에 Bearer Token 값으로 포함하여 호출해야 서버단에서 토큰을 받아 검사할 수 있다.
      ignoreExpiration: false,
      // 토큰이 만료되면 에러를 리턴한다.
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      //jwt 토큰을 생성할 떄 사용되는 key - .env 파일에 환경변수로 관리해준다.
    });
  }

  async validate(payload: any) {
    // payload를 받아 인증된 id와 email을 return한다.
    return { id: payload.id, hospitalId: payload.hospitalId };
  }
}
