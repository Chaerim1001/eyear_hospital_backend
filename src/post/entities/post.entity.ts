import { Hospital } from '../../hospital/entities/hospital.entity';
import { Patient } from '../../hospital/entities/patient.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Common } from '../../entities/common.entity';

@Entity()
// 영상 우편 테이블
export class Post extends Common {
  @Column({ type: 'varchar' })
  video: string; // 클라우드에 저장되어 있는영상 url

  @Column({ type: 'varchar' })
  text: string; // 클라우드에 저장되어 있는 자막 파일 url

  @Column({ default: false })
  check: boolean; // 우편 확인 여부

  @Column({ type: 'int' })
  stampNumber: number; // 우편 번호

  @Column({ type: 'int' })
  cardNumber: number; // 카드 번호

  @ManyToOne(() => Hospital, (hospital) => hospital.posts, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital; // 영상 우편과 연결된 병원 fk

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User; // 영상 우편을 보낸 사용자 fk

  @ManyToOne(() => Patient, (patient) => patient.posts, { onDelete: 'CASCADE' })
  patient: Patient; // 영상 우편을 받을 환자 fk
}
