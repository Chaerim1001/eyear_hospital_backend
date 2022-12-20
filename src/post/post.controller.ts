import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { PostService } from './post.service';
import { PostDetailParamDto } from './dto/post-detail-param.dto';
import { PostDetailResponse } from './dto/post-detail-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('post') // 'post' 로 시작하는 요청에 대해 처리하는 Controller
@ApiTags('Post API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('detail/:postId') // 영상 우편 디테일에 대한 요청
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '병원 받은 우편 상세 페이지 확인 API',
    description: '받은 우편 상세 확인',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: PostDetailResponse,
  })
  async getPostDetail(
    @Param() param: PostDetailParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!param) {
      return new BadRequestException('required parameter');
    }
    // 요청 param이 올바르지 않을 경우 에러 발생

    const post = await this.postService.getPostDetail(
      param.postId,
      req.user.hospitalId,
    );
    // 요청 postId에 해당하는 post를 찾아 반환한다.
    const result = {
      message: 'success',
      post: post,
    };
    return res.status(HttpStatus.OK).send(result);
  }
}
