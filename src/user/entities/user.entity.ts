import { Exclude } from 'class-transformer';
import { Post } from '../../post/entities/post.entity';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Common } from '../../entities/common.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { Patient } from '../../hospital/entities/patient.entity';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { NameWord } from '../../keywords/entities/nameWord.entity';
import { Keyword } from '../../keywords/entities/keyworrd.entity';

@Entity()
// 개인 테이블
export class User extends Common {
  @Column({ type: 'varchar', length: 20 })
  name: string; // 이름

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string; // 이메일

  @Column({ type: 'varchar' })
  password: string; // 비밀번호

  @Column({ type: 'varchar', length: 50 })
  phoneNumber: string; // 전화번호

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string; // auth 인증에 사용하는 refresh token

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]; // 개인이 보낸 영상 우편 fk

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[]; // 개인이 신청한 면회 예약 fk

  @OneToOne(() => Patient)
  @JoinColumn()
  patient: Patient; // 개인과 연결된 환자 fk

  @ManyToOne(() => Hospital, (hospital) => hospital.users, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital; // 개인과 연결된 환자가 속한 병원 fk

  @OneToMany(() => Keyword, (keyword) => keyword.user)
  keywords: Keyword[]; // 개인이 보낸 영상 우편의 추출 키워드 fk

  @OneToMany(() => NameWord, (nameWord) => nameWord.user)
  nameWords: NameWord[]; // 개인 이름에 대한 이름 + 조사 키워드 fk
}
