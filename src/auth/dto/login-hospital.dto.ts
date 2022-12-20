import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// Login 요청 데이터 클래스
export class LoginHospitalDto {
  @IsString() // string 타입인지 확인하고 string 타입이 아닐 경우 자동으로 400 에러를 전송한다.
  @IsNotEmpty() // 빈 값이 들어오면 안된다는 설정을 해주는 어노테이션
  @ApiProperty({ description: '병원 아이디', example: 'test_id' })
  hospitalId: string; // 로그인에 사용할 아이디

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호', example: 'test_password' })
  password!: string; // 로그인에 사용할 비밀번호
}
