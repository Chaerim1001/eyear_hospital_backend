import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Common } from '../../entities/common.entity';

@Entity()
// 고유 명사 및 조사 연결에 대한 테이블
export class NameWord extends Common {
  @Column({ type: 'varchar' })
  word: string; // 단어

  @ManyToOne(() => User, (user) => user.nameWords, { onDelete: 'CASCADE' })
  user: User; // 단어와 연결된 사용자 fk
}
