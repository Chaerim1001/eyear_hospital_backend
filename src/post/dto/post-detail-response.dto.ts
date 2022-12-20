import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../util/swagger/base-response.dto';

// 영상 우편 디테일에 대한 응답 데이터 클래스
class PostDetailData {
  @ApiProperty({ description: '우편 아이디', example: 1 })
  id: number; // 영상 우편 고유 id

  @ApiProperty({ description: '영상 url', example: 'http://~~~' })
  video: string; // 클라우드에 올라가있는 영상 파일의 url

  @ApiProperty({ description: '자막 url', example: 'http://~~~' })
  text: string; // 클라우드에 올라가있는 자막 파일의 url

  @ApiProperty({ description: '확인 여부', example: true })
  check: boolean; // 영상 우편 확인 여부

  @ApiProperty({ description: '우편 인덱스', example: 1 })
  stampNumber: number; // 우편 인덱스

  @ApiProperty({ description: '카드 인덱스', example: 1 })
  cardNumber: number; // 카드 인덱스

  @ApiProperty({ description: '우편 전송 날짜', example: '2022-12-12' })
  createdAt: string; // 우편 전송 날짜
}

export abstract class PostDetailResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: {
      id: 1,
      video: 'test_url',
      text: 'test_url',
      check: false,
      stampNumber: 1,
      cardNumber: 1,
      createdAt: '2022-11-26',
    },
  })
  post: PostDetailData;
}
