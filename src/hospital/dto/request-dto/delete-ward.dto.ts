import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

// 병동 삭제 요청에 사용할 데이터 클래스
export class DeleteWardDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '병동 아이디', example: 1 })
  id: number; // 병동 고유 id
}
