const { sequelize, User, Post } = require("./sequelize_example/sequelize-setup");

async function main() {
    try {
        await sequelize.sync({ force: true }); // 데이터베이스 동기화

        // User 생성
        const newUser = await User.create({
            name: "홍길동",
            age: 30,
            email: "hong@example.com",
        });

        // Post 생성 및 User와 관계 설정
        const newPost1 = await Post.create({
            title: "첫 번째 포스트",
            content: "이것은 첫 번째 포스트의 내용입니다.",
            userId: newUser.id,
        });

        const newPost2 = await Post.create({
            title: "두 번째 포스트",
            content: "이것은 두 번째 포스트의 내용입니다.",
            userId: newUser.id,
        });

        console.log("User와 관련된 Posts를 생성했습니다.");

        // User와 관련된 Post들 조회
        const userWithPosts = await User.findOne({
            where: { id: newUser.id },
            include: Post,
        });
        console.log("User와 그 User의 Posts:", userWithPosts.toJSON());
    } catch (error) {
        console.error("데이터베이스 작업 중 오류:", error);
    } finally {
        await sequelize.close();
    }
}

main();
