import { Hospital } from '../../hospital/entities/hospital.entity';
import { Patient } from '../../hospital/entities/patient.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Common } from '../../entities/common.entity';

@Entity()
// 면회 예약 테이블
export class Reservation extends Common {
  @Column({ type: Date, nullable: true })
  reservationDate: Date; // 면회를 원하는 날짜

  @Column({ type: 'int' })
  timetableIndex: number; // 면회를 원하는 시간대 인덱스

  @Column({ type: 'boolean' })
  faceToface: boolean; // 대면 비대면 여부 선택

  @Column({ type: 'int', default: 0 })
  approveCheck: number; // 병원에서 승인을 헀는지에 대한 컬럼

  @ManyToOne(() => Hospital, (hospital) => hospital.reservations, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital; // 면회를 관리하는 병원 fk

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User; // 면회를 신청한 사용자 fk

  @ManyToOne(() => Patient, (patient) => patient.reservations, {
    onDelete: 'CASCADE',
  })
  patient: Patient; // 면회와 연결된 환자 fk
}
