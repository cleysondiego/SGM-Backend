import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFileFieldToSubjects1601346501639
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subjects',
      new TableColumn({
        name: 'file',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('subjects', 'file');
  }
}
