import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 요청 hospital 데이터 클래스
export class ReqHospitalDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  hospitalId: string;
}
