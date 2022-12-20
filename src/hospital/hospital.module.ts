import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { Hospital } from './entities/hospital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { Room } from './entities/room.entity';
import { Patient } from './entities/patient.entity';
import { Reservation } from '../reservation/entities/reservation.entity';

// hospital 관련 처리를 위한 module 관리
@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital, Ward, Room, Patient, Reservation]),
  ],
  providers: [HospitalService],
  controllers: [HospitalController],
})
export class HospitalModule {}
