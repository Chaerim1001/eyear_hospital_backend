import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from '../hospital/entities/hospital.entity';
import { Patient } from '../hospital/entities/patient.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>, // Post 테이블에 대한 의존성 주입 --> repository 정의
  ) {
    this.postRepository = postRepository;
  }

  async getPostDetail(postId: number, hospitalId: string) {
    // 영상 우편 상세 디테일에 대한 조회 함수
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.hospital', 'hospital')
      .where('post.id =:postId', { postId })
      .andWhere('hospital.hospitalId =:hospitalId', { hospitalId })
      .execute();

    if (post.length != 1) {
      // 요청에 의해 조회한 영상이 한개가 아닐 경우 에러를 발생시킨다.
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['not existed post'],
        error: 'Not Found',
      });
    }

    return {
      id: post[0].post_id,
      video: post[0].post_video,
      text: post[0].post_text,
      check: post[0].post_check,
      stampNumber: post[0].post_stampNumber,
      cardNumber: post[0].post_cardNumber,
      createdAt: post[0].post_createdAt.toISOString().split('T')[0],
    };
  }
}
