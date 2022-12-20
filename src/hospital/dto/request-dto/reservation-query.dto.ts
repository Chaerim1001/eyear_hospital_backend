import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

// 면회 예약건 조회 요청에 사용하는 데이터 클래스
export class ReservationQueryDto {
  @ApiProperty({
    description: '조회를 원하는 예약 날짜',
    example: '2022-12-12',
  })
  @IsNotEmpty()
  @IsDateString()
  reservationDate: Date; // 조회를 원하는 날짜
}
