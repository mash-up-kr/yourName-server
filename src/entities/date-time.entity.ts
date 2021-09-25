import { CreateDateColumn } from 'typeorm';

export class DateTimeEntity {
  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
