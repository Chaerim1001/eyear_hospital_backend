import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from '../hospital/entities/hospital.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

// 면회 예약 관련 처리에 사용되는 클래스들에 대한 표기
@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
