import { Post } from '../../post/entities/post.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';
import { Ward } from './ward.entity';
import { Common } from '../../entities/common.entity';
import { Exclude } from 'class-transformer';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
// 병원 테이블
export class Hospital extends Common {
  @Column({ type: 'varchar', length: 50 })
  name: string; // 병원 이름

  @Column({ type: 'varchar', length: 50, unique: true })
  hospitalId: string; // 병원이 로그인에 사용할 아이디

  @Column({ type: 'varchar' })
  password: string; // 병원이 로그인에 사용할 비밀번호

  @Column({ type: 'varchar', length: 50, unique: true })
  phoneNumber: string; // 병원 전화번호

  @Column({ type: 'varchar' })
  address: string; // 병원 주소

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string; // 병원의 refresh token을 저장하기 위한 컬럼

  @OneToMany(() => Ward, (ward) => ward.hospital)
  wards: Ward[]; // 병원과 연동된 병동 fk

  @OneToMany(() => Patient, (patient) => patient.hospital)
  patients: Patient[]; // 병원과 연동된 환자 fk

  @OneToMany(() => Post, (post) => post.hospital)
  posts: Post[]; // 병원과 연동된 우편 fk

  @OneToMany(() => Reservation, (reservation) => reservation.hospital)
  reservations: Reservation[]; // 병원과 연동된 면회 예약 fk

  @OneToMany(() => User, (user) => user.hospital)
  users: User[]; // 병원과 연동된 사용자 fk
}
