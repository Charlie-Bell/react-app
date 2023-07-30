module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reply: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Posts
};