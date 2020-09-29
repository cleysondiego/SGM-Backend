import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import Monitoring from './Monitoring';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  file: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  monitoring_id: string;

  @ManyToMany(() => Monitoring)
  @JoinColumn({ name: 'monitoring_id' })
  monitoring: Monitoring;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'file_path_url' })
  getFilePath(): string | null {
    if (!this.file) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.file}`;
  }
}

export default Subject;
