import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 병동 수정 요청에 사용되는 데이터 클래스
export class UpdateWardDto {
  @ApiProperty({
    description: '수정을 원하는 병동 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number; // 수정을 원하는 병동 고유 id

  @ApiProperty({
    description: '수정을 원하는 병동 이름',
    example: '201동',
  })
  @IsNotEmpty()
  @IsString()
  name: string; // 병동 이름
}
