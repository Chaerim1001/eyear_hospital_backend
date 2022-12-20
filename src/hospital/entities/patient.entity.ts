import { Post } from '../../post/entities/post.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hospital } from './hospital.entity';
import { Room } from './room.entity';
import { Ward } from './ward.entity';
import { Common } from '../../entities/common.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { Keyword } from '../../keywords/entities/keyworrd.entity';

@Entity()
// 환자 테이블
export class Patient extends Common {
  @Column({ type: 'varchar', length: 50 })
  name: string; // 환자 이름

  @Column({ type: 'varchar', length: 50, unique: true })
  patNumber: string; // 환자 번호

  @Column()
  birth: Date; // 환자 생년월일

  @Column()
  inDate: Date; // 환자 입원일자

  @Column({ type: 'varchar' })
  infoNumber: string; // 환자 주민번호

  @ManyToOne(() => Hospital, (hospital) => hospital.patients, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital; // 환자와 연결된 병원 fk

  @ManyToOne(() => Ward, (ward) => ward.patients, { onDelete: 'CASCADE' })
  ward: Ward; // 환자와 연결된 병동 fk

  @ManyToOne(() => Room, (room) => room.patients, { onDelete: 'CASCADE' })
  room: Room; // 환자와 연결된 병실 fk

  @OneToMany(() => Post, (post) => post.patient)
  posts: Post[]; // 환자와 연결된 우편 fk

  @OneToMany(() => Reservation, (reservation) => reservation.patient)
  reservations: Reservation[]; // 환자와 연결된 면회 예약 fk

  @OneToMany(() => Keyword, (keyword) => keyword.patient)
  keywords: Keyword[]; // 횐자와 연결된 추출 keyword fk
}
