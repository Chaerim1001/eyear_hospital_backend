import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';
// 아이디 중복 체크 요청에 대한 응답 데이터 클래스
class IdCheckResponseData {
  result: boolean;
  test: string;
}

export abstract class IdCheckResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      result: true,
      text: '이미 존재하는 아이디입니다.',
    },
  })
  idCheck: IdCheckResponseData;
}
