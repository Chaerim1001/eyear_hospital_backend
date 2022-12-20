import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 환자 등록 요청에 사용하는 데이터 클래스
export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '환자 이름', example: '박노인' })
  name: string; // 환자 이름

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '환자 번호', example: 'PA1231' })
  patNumber: string; // 환자 번호

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '환자 생년월일', example: '1999-10-10' })
  birth: Date; // 환자 생년월일

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '환자 입원일자', example: '2013-03-10' })
  inDate: Date; // 환자 입원날짜

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '환자 주민번호', example: '000000-0000000' })
  infoNumber: string; // 환자 주민번호

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '병동 이름', example: '201동' })
  wardName: string; // 환자가 속해있는 병동 이름

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '병실 호수', example: 100 })
  roomNumber: number; // 환자가 속해있는 병실 번호
}
