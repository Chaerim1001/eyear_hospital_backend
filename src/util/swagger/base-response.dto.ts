import { ApiProperty } from '@nestjs/swagger';

// 응답에 기본적으로 들어가는 데이터를 클래스로 만들어 각각 api의 response 클래스가 이를 상속받아 사용하도록 만든다.
export abstract class BaseResponse {
  @ApiProperty({ description: 'response message', example: 'success' })
  message: string;
}
