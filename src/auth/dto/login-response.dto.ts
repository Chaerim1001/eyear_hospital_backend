import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/util/swagger/base-response.dto';

class TokensData {
  access_token: string;
  refresh_token: string;
}

// Login 후 응답 데이터 클래스
class LoginResponseData {
  name: string;
}

export abstract class LoginResponse extends BaseResponse {
  constructor() {
    super();
  }
  // @ApiProperty: 서버 API 문서화를 위한 어노테이션
  @ApiProperty({
    description: 'tokens',
    example: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaG9zcGl0YWxJZCI6InRlc3RfaG9zX2lkIiwiaWF0IjoxNjcwMDU5MDU5LCJleHAiOjE2NzAwNjA4NTl9.CDbX3DbHz7uuZ3boOIX4EWTJcHV_ReaxSTb8P3hoKVs',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaG9zcGl0YWxJZCI6InRlc3RfaG9zX2lkIiwiaWF0IjoxNjcwMDU5MDU5LCJleHAiOjE2NzA2NjM4NTl9.3qlp_5RuH_eh6txQgSq0j5JoWO2-5sAoZx8WOyw4VRo',
    },
  })
  tokens: TokensData;

  @ApiProperty({
    description: 'hospital info',
    example: {
      name: '참나무 병원',
    },
  })
  user: LoginResponseData;
}
