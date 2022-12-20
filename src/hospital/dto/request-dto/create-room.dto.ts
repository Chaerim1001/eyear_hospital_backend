import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 병실 생성 요청에 사용할 데이터 클래스
export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '병실 호수', example: 100 })
  roomNumber: number; // 병실 번호

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '병실 최대 환자 수', example: 10 })
  limitPatient: number; // 병실 최대 입원 가능 환자 수

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'icu 병실 여부', example: true })
  icuCheck: boolean; // 병실의 icu 여부

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '병동 이름', example: '201호' })
  wardName: string; // 병실이 속한 병동 이름
}
