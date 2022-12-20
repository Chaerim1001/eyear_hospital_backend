import { Common } from '../../entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';
import { Ward } from './ward.entity';

@Entity()
// 병실 테이블
export class Room extends Common {
  @Column({ type: 'int' })
  roomNumber: number; // 병실 번호

  @Column({ type: 'int' })
  limitPatient: number; // 병실 최대 입원 환자 수

  @Column({ type: 'int' })
  currentPatient: number; // 병실 현재 입원 환자 수

  @Column()
  icuCheck: boolean; // 병실의 icu 여부

  @ManyToOne(() => Ward, (ward) => ward.rooms, { onDelete: 'CASCADE' })
  ward: Ward; // 병실과 연결된 병동 fk

  @OneToMany(() => Patient, (patient) => patient.room)
  patients: Patient[]; // 병실과 연결된 환자 fk
}
