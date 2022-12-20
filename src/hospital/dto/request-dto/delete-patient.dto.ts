import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

// 환자 삭제 요청에 사용할 데이터 클래스
export class DeletePatientDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '환자 아이디', example: 1 })
  id: number; // 환자 고유 id
}
