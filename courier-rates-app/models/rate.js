module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    "Rate",
    {
      id: {
        allowNull: false,

        primaryKey: true,
        type: DataTypes.STRING,
      },
      rates: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );

  return Rate;
};
