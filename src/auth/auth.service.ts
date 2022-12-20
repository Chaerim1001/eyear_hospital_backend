import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHospitalDto } from './dto/login-hospital.dto';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Hospital) // Hospital 테이블을 사용하기 위해 repository에 의존성을 주입해준다.
    private hospitalRepository: Repository<Hospital>, // Hospital 관련 데이터를 처리하기 위한 repository
    private jwtService: JwtService, // jwt 관련 연결을 위한 service
  ) {}

  // hospitalId 와 password를 사용해 사용자를 확인하는 함수
  async validateHospital(requestDto: LoginHospitalDto): Promise<any> {
    const { hospitalId, password } = requestDto;

    const hos = await this.hospitalRepository.findOneBy({ hospitalId });

    if (!hos) {
      //hospitalId를 가진 데이터가 없는 경우 에러를 발생시킨다.
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Unregistered hospital'],
        error: 'Forbidden',
      });
    }
    // 비밀번호는 암호화하여 저장하기 때문에 bcrypt를 사용하여 비교한다.
    const isMatch = await bcrypt.compare(password, hos.password);

    if (isMatch) {
      const { password, ...result } = hos;
      return result;
    } else {
      // 비밀번호가 일치하지 않을 경우 에러를 발생시킨다.
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Wrong password'],
        error: 'Forbidden',
      });
    }
  }

  async login(hospital: any) {
    // 로그인을 처리하는 함수
    const tokens = await this.getTokens(hospital.id, hospital.hospitalId);
    // 로그인 성공 시 보낼 토큰을 생성하여 함께 보낸다.
    const data = {
      tokens: tokens,
      user: {
        name: hospital.name,
      },
    };
    await this.updateRtHash(hospital.id, tokens.refresh_token);
    return data;
  }

  async updateRtHash(id: number, refresh_token: string) {
    // refresh token을 갱신하는 함수
    const hash = await this.hashData(refresh_token); // 해쉬 토큰을 받아온다.
    await this.hospitalRepository.update(
      // 리프레쉬 토큰을 업데이트한다.
      { id },
      { currentHashedRefreshToken: hash },
    );
  }

  async refreshTokens(hospital: any) {
    // 리프레쉬 토큰 관련 함수
    const isExist = await this.hospitalRepository.findOneBy({
      id: hospital.id,
    });
    if (!isExist || !isExist.currentHashedRefreshToken)
      throw new ForbiddenException('Invalid credentials');
    const rtMatches = bcrypt.compare(
      hospital.refresh_token,
      isExist.currentHashedRefreshToken,
    );
    if (!rtMatches) throw new ForbiddenException('Invalid credentials');
    // 병원 사용자에게 저장되어 있는 리프레쉬 토큰이 데이터베이스의 값과 일치할 경우 access token을 새로 생성하여 전달해준다.
    const tokens = await this.getTokens(hospital.id, hospital.hospitalId);
    await this.updateRtHash(hospital.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    // 해쉬 함수
    return bcrypt.hash(data, 10);
  }

  async getTokens(id: number, hospitalId: string) {
    // access token과 regfresh token을 생성해주는 함수
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { id, hospitalId },
        {
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        },
      ),
      this.jwtService.signAsync(
        { id, hospitalId },
        {
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
