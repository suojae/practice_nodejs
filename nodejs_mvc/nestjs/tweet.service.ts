import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
    constructor(private readonly tweetRepository: TweetRepository) {}

    getAll() {
        return this.tweetRepository.getAll();
    }

    getAllByUsername(username: string) {
        return this.tweetRepository.getAllByUsername(username);
    }

    getById(id: string) {
        return this.tweetRepository.getById(id);
    }

    create(createTweetDto: CreateTweetDto) {
        return this.tweetRepository.create(createTweetDto);
    }

    update(id: string, updateTweetDto: UpdateTweetDto) {
        return this.tweetRepository.update(id, updateTweetDto.text);
    }

    delete(id: string) {
        return this.tweetRepository.remove(id);
    }
}
