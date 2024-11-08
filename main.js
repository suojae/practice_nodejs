const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

// 데이터베이스 존재 여부 확인 및 생성
async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
    });

    // 데이터베이스가 없으면 생성
    await connection.query("CREATE DATABASE IF NOT EXISTS `database_name`");
    await connection.end();
}

// Sequelize 인스턴스 생성
const sequelize = new Sequelize('database_name', 'root', '1234', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function init() {
    await ensureDatabaseExists(); // 데이터베이스 존재 확인 및 생성
    await testConnection(); // 연결 테스트
    await crudOperations(); // CRUD 함수 실행
}

// User 모델 정의
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
});

// CRUD 함수 정의
async function crudOperations() {
    await sequelize.sync({ force: true }); // 모든 모델 동기화 (데이터 삭제 후 초기화)

    // 1. CREATE - 데이터 생성
    const newUser = await User.create({
        name: 'dqwdqdqwdqwd',
        email: 'alice@example.com',
    });
    console.log('Created User:', newUser.toJSON());

    // 2. READ - 데이터 조회
    const users = await User.findAll();
    console.log('All Users:', JSON.stringify(users, null, 2));

    // 3. UPDATE - 데이터 업데이트
    await User.update(
        { name: 'Alice Updated' },
        {
            where: {
                email: 'alice@example.com',
            },
        }
    );
    const updatedUser = await User.findOne({ where: { email: 'alice@example.com' } });
    console.log('Updated User:', updatedUser.toJSON());

    // 4. DELETE - 데이터 삭제
    await User.destroy({
        where: {
            email: 'alice@example.com',
        },
    });
    console.log('User deleted successfully');
}

// init 함수 실행
init();
