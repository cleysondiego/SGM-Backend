import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddScheduleFieldToMonitoring1602123922732
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'monitoring',
      new TableColumn({
        name: 'schedule',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('monitoring', 'schedule');
  }
}
