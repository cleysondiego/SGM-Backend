import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Monitoring from '@modules/monitoring/infra/typeorm/entities/Monitoring';

@Entity('presences')
class Presences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_registration: string;

  @Column()
  monitor_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'monitor_id' })
  monitor: string;

  @Column()
  monitoring_id: string;

  @ManyToMany(() => Monitoring)
  @JoinColumn({ name: 'monitoring_id' })
  monitoring: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Presences;
