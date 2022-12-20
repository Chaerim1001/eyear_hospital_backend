import { Common } from '../../entities/common.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hospital } from './hospital.entity';
import { Patient } from './patient.entity';
import { Room } from './room.entity';

@Entity()
// 병동 테이블
export class Ward extends Common {
  @Column({ type: 'varchar', length: 50 })
  name: string; //  병동 이름

  @ManyToOne(() => Hospital, (hospital) => hospital.wards, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital; // 병동이 속한 병원 fk

  @OneToMany(() => Room, (room) => room.ward)
  rooms: Room[]; // 병동에 속한 병실 fk

  @OneToMany(() => Patient, (patient) => patient.ward)
  patients: Patient[]; // 병동에 속한 환자 fk
}
