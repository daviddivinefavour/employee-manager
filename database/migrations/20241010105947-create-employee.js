'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'employees',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name',
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name',
          },
          startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'start_date',
          },
          department: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          jobRole: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'job_role',
          },
          birthday: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          archivedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'archived_at',
            defaultValue: null,
          },
          userId: {
            allowNull: false,
            type: Sequelize.UUID,
            field: 'user_id',
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            field: 'deleted_at',
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('employees', transaction);
    });
  },
};
