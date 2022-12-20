import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 환자 등록 요청에 대한 응답 데이터 클래스
class CreatePatientResponseData {
  id: number;
  name: string;
  patNumber: string;
  infoNumber: string;
}

export abstract class CreatePatientResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      id: 1,
      name: '박노인',
      patNumber: 'PA12314',
      infoNumber: '000000-0000000',
    },
  })
  patient: CreatePatientResponseData;
}
