import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 면회 승인 여부 결정 요청에 대한 응답 데이터 클래스
class ChangeStateResponseData {
  @ApiProperty({ description: '예약 아이디', example: 1 })
  reservationId: number;

  @ApiProperty({ description: '승인 여부', example: '에약 승인' })
  state: string;
}

export abstract class ChangeStateResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      reservationId: 1,
      state: '예약 거부',
    },
  })
  result: ChangeStateResponseData;
}
