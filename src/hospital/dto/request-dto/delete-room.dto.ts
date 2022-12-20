import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

// 병실 삭제 요청에 사용할 데이터 클래스
export class DeleteRoomDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '병실 아이디', example: 1 })
  id: number; // 병실 고유 id
}
