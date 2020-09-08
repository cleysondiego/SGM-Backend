import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('monitoring')
class Monitoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isAvailable: boolean;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  teacher_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column()
  monitor_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'monitor_id' })
  monitor: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Monitoring;
