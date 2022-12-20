import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

// 병실 수정 요청에 사용할 데이터 클래스
export class UpdateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '수정을 원하는 병실 아이디', example: 3 })
  id: number; // 수정을 원하는 병실 고유 id

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '병실 번호',
    example: 201,
  })
  roomNumber?: number; // 병실 번호 (옵션 데이터)

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '최대 환자 수 ', example: 10 })
  limitPatient?: number; // 병실에 입원 가능한 최대 환자 수 (옵션 데이터)

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'icu check',
    example: 0,
  })
  icuCheck?: boolean; // 병실의 icu 여부 (옵션 데이터)
}
