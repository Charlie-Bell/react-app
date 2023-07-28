module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Posts
};