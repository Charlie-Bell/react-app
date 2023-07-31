module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        comment: {
            type: DataTypes.STRING(3000),
            allowNull: false,
        },
        reply: {
            type: DataTypes.STRING(3000),
            allowNull: false,
        }
    });

    return Posts
};