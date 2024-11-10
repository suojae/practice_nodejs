import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    NotFoundException,
    HttpStatus,
    Res
} from '@nestjs/common';
import {CreateTweetDto} from './dto/create-tweet.dto';
import {UpdateTweetDto} from './dto/update-tweet.dto';
import {TweetService} from "./tweet.service";

@Controller('tweets')
export class TweetController {
    constructor(private readonly tweetService: TweetService) {
    }

    @Get()
    async getTweets({username, res}: { username: string, res: any }) {
        const tweets = username
            ? this.tweetService.getAllByUsername(username)
            : await this.tweetService.getAll();
        return res.status(HttpStatus.OK).json(tweets);
    }

    @Get(':id')
    async getTweet({id, res}: { id: string, res: any }) {
        const tweet = await this.tweetService.getById(id);
        if (!tweet) {
            throw new NotFoundException(`Tweet id(${id}) not found`);
        }
        return res.status(HttpStatus.OK).json(tweet);
    }

    @Post()
    async createTweet({createTweetDto, res}: { createTweetDto: CreateTweetDto, res: any }) {
        const tweet = await this.tweetService.create(createTweetDto);
        return res.status(HttpStatus.CREATED).json(tweet);
    }

    @Put(':id')
    async updateTweet({id, updateTweetDto, res}: { id: string, updateTweetDto: UpdateTweetDto, res: any }) {
        const tweet = await this.tweetService.update(id, updateTweetDto);
        if (!tweet) {
            throw new NotFoundException(`Tweet id(${id}) not found`);
        }
        return res.status(HttpStatus.OK).json(tweet);
    }

    @Delete(':id')
    async deleteTweet({id, res}: { id: string, res: any }) {
        await this.tweetService.delete(id);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }
}
