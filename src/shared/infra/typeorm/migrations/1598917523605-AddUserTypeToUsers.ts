import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserTypeToUsers1598917523605
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'user_type',
        type: 'integer',
        isNullable: false,
        default: 3,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'user_type');
  }
}
