import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

// 병원 회원가입 요청에 사용하는 데이터 클래스
export class CreateHospitalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '병원 이름', example: 'test_name' })
  name: string; // 병원 이름

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '병원 아이디', example: 'test_id' })
  hospitalId: string; // 병원 아이디

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '병원 비밀번호', example: 'test_password' })
  password: string; // 병원 비밀번호

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/)
  @ApiProperty({ description: '병원 전화번호', example: '010-1111-1111' })
  phoneNumber: string; // 병원 전화번호

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '병원 주소', example: '서울시 중랑구' })
  address: string; // 병원 주소
}
