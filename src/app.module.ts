import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hospital } from './hospital/entities/hospital.entity';
import { Patient } from './hospital/entities/patient.entity';
import { Room } from './hospital/entities/room.entity';
import { Ward } from './hospital/entities/ward.entity';
import { Post } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';
import { HospitalModule } from './hospital/hospital.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { Keyword } from './keywords/entities/keyworrd.entity';
import { NameWord } from './keywords/entities/nameWord.entity';
// 해당 어플리케이션 전체에 대한 모듈 관리
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          // 데이터베이스 연결 관련 코드
          type: 'mysql',
          host: process.env.MYSQLDB_HOST,
          port: parseInt(process.env.MYSQLDB_DOCKER_PORT, 10),
          username: process.env.MYSQLDB_USER,
          password: process.env.MYSQLDB_PASSWORD,
          database: process.env.MYSQLDB_DATABASE,
          entities: [
            User,
            Post,
            Room,
            Ward,
            Patient,
            Hospital,
            Reservation,
            Keyword,
            NameWord,
          ],
          synchronize: true, // Fix me : set this value to false when deploy
          timezone: 'z',
          charset: 'utf8mb4',
        };
      },
    }),
    ConfigModule.forRoot(),
    HospitalModule,
    AuthModule,
    PostModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
