import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 각 테이블에 공통으로 들어가는 고유 id와 생성일자, 수정일자는 하나의 클래슬로 묶고, 다른 테이블에서 이 클래스를 상속받아 사용하도록 정의해둔다.
export abstract class Common {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
