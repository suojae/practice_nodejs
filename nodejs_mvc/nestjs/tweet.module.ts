import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TweetRepository } from './tweet.repository';

@Module({
    controllers: [TweetController],
    providers: [TweetService, TweetRepository],
})
export class TweetModule {}
