import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from '../hospital/entities/hospital.entity';
import { Patient } from '../hospital/entities/patient.entity';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
// 영상 우편 관련 처리에서 사용하는 클래스들에 대한 표기
@Module({
  imports: [TypeOrmModule.forFeature([Post, Hospital, User, Patient])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
