import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 병실 등록 요청에 대한 응답 데이터 클래스
class CreateRoomResponseData {
  id: number;
  roomNumber: number;
}

export abstract class CreateRoomResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      id: 1,
      roomNumber: 100,
    },
  })
  room: CreateRoomResponseData;
}
