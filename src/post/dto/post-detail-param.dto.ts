import { ApiProperty } from '@nestjs/swagger';

// 영상 우편 상세 디테일 요청에 대한 데이터 클래스
export class PostDetailParamDto {
  @ApiProperty({ description: 'post detail request parameter', example: 1 })
  postId: number;
}
