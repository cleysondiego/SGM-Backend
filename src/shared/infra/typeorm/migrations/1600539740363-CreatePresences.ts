import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePresences1600539740363
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'presences',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'student_registration',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'monitor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'monitoring_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'presences',
      new TableForeignKey({
        name: 'Monitor',
        columnNames: ['monitor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'presences',
      new TableForeignKey({
        name: 'Monitoring',
        columnNames: ['monitoring_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'monitoring',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('presences', 'Monitor');
    await queryRunner.dropForeignKey('presences', 'Monitoring');

    await queryRunner.dropTable('presences');
  }
}
