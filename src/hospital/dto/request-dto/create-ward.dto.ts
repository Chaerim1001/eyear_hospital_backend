import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// 병동 생성 요청에 사용할 데이터 클래스
export class CreateWardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '병동 이름', example: '201동' })
  name: string; // 병동 이름
}
