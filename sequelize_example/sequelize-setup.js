const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database_name", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

// User 모델 정의
const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

// Post 모델 정의
const Post = sequelize.define("Post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// 관계 설정 (일대다 관계)
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Post };
