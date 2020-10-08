import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDayFieldToMonitoring1602124550154
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'monitoring',
      new TableColumn({
        name: 'day',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('monitoring', 'day');
  }
}
