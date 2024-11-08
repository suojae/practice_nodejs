import { AppDataSource } from "./typeorm_example/data-source";
import {User} from "./typeorm_example/user";
import {Post} from "./typeorm_example/post";

AppDataSource.initialize()
    .then(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        // User 생성
        const newUser = new User();
        newUser.name = "홍길동";
        newUser.age = 30;
        newUser.email = "hong@example.com";
        await userRepository.save(newUser);

        // Post 생성 및 User와 관계 설정
        const newPost1 = new Post();
        newPost1.title = "첫 번째 포스트";
        newPost1.content = "이것은 첫 번째 포스트의 내용입니다.";
        newPost1.user = newUser;
        await postRepository.save(newPost1);

        const newPost2 = new Post();
        newPost2.title = "두 번째 포스트";
        newPost2.content = "이것은 두 번째 포스트의 내용입니다.";
        newPost2.user = newUser;
        await postRepository.save(newPost2);

        console.log("User와 관련된 Posts를 생성했습니다.");

        // User와 관련된 Post들 조회
        const userWithPosts = await userRepository.findOne({
            where: { id: newUser.id },
            relations: ["posts"],
        });
        console.log("User와 그 User의 Posts:", userWithPosts);
    })
    .catch((error) => console.log("데이터베이스 연결 오류:", error));
