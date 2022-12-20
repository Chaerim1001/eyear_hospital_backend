import { Patient } from '../../hospital/entities/patient.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Common } from '../../entities/common.entity';

@Entity()
// 추출 키워드 테이블
export class Keyword extends Common {
  @Column({ type: 'varchar' })
  word: string; // 추출 단어

  @Column({ type: 'double' })
  rank: number; // 추출 단어의 중요도

  @ManyToOne(() => User, (user) => user.keywords, { onDelete: 'CASCADE' })
  user: User; // keyword와 연결된 사용자 fk

  @ManyToOne(() => Patient, (patient) => patient.keywords, {
    onDelete: 'CASCADE',
  })
  patient: Patient; // keyword와 연결된 환자 fk
}
