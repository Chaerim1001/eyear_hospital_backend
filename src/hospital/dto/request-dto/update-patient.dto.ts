import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// 환자 정보 수정 요청에 사용하는 데이터 클래스 -> 수정을 원하는 데이터
export class UpdatePatientDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '환자 아이디', example: 1 })
  id: number; // 환자 아이디 (필수 데이터)

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '환자 이름', example: '박노인' })
  name?: string; // 환자 이름 (옵션 데이터)

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '환자 번호', example: 'PA1231' })
  patNumber?: string; // 환자 번호 (옵션 데이터)

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '환자 생년월일', example: '1999-10-10' })
  birth?: Date; // 환자 생년월일 (옵션 데이터)

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '환자 입원일자', example: '2013-03-10' })
  inDate?: Date; // 환자 입원 날짜 (옵션 데이터)

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '환자 주민번호', example: '000000-0000000' })
  infoNumber?: string; // 환자 주민번호 (옵션 데이터)
}
