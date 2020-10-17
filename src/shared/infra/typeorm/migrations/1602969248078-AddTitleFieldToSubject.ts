import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTitleFieldToSubject1602969248078
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subjects',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('subjects', 'title');
  }
}
