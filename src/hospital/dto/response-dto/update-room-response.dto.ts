import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';
import { UpdateRoomDto } from '../request-dto/update-room.dto';

// 병실 수정 요청에 대한 응답 데이터 클래스
export abstract class UpdateRoomResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result - 병실의 수정된 데이터가 전송됩니다.',
  })
  room: UpdateRoomDto;
}
