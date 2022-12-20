import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 병원 회원가입 요청에 대한 응답 데이터 클래스
class CreateHospitalResponseData {
  name: string;
  hospitalId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
  address: string;
}

export abstract class CreateHospitalResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      name: 'testName',
      hospitalId: 'testId',
      id: 1,
      createdAt: '2022-11-25T08:49:39.186Z',
      updatedAt: '2022-11-25T08:49:39.186Z',
      phoneNumber: '010-1234-1234',
      address: '서울시',
    },
  })
  hospital: CreateHospitalResponseData;
}
