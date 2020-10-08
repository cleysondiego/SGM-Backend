import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRoomFieldToMonitoring1602123537496
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'monitoring',
      new TableColumn({
        name: 'room',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('monitoring', 'room');
  }
}
