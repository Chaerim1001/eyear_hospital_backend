import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// 아이디 중복 체크 요청에 사용할 데이터 클래스
export class IdCheckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '병원 아이디', example: 'test_id' })
  hospitalId: string; // 중복 검사를 하고자하는 병원 아이디
}
