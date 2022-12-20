import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

// 면회 승인 여부를 결정하는 요청 데이터 클래스
export class ChangeStateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '예약 아이디', example: 3 })
  reservationId: number; // 승인 여부를 결정하고자 하는 면회 예약 고유 id

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '승인 여부 (true: 1, false: -1)',
    example: 1,
  })
  state: number; // 승인 여부
}
