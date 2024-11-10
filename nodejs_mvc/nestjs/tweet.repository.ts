import {Injectable} from '@nestjs/common';
import {CreateTweetDto} from './dto/create-tweet.dto';

interface Tweet {
    id: string;
    text: string;
    createdAt: Date;
    name: string;
    username: string;
    url?: string;
}

@Injectable()
export class TweetRepository {
    private tweets: Tweet[] = [
        {
            id: '1',
            text: '화이팅!',
            createdAt: new Date(),
            name: 'Bob',
            username: 'bob',
            url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
        },
        {
            id: '2',
            text: '안뇽!',
            createdAt: new Date(),
            name: 'suojae',
            username: 'suojae',
        },
    ];

    getAll() {
        return this.tweets;
    }

    getAllByUsername(username: string) {
        return this.tweets.filter(tweet => tweet.username === username);
    }

    getById(id: string) {
        return this.tweets.find(tweet => tweet.id === id);
    }

    create(createTweetDto: CreateTweetDto) {
        const tweet: Tweet = {
            id: Date.now().toString(),
            text: createTweetDto.text,
            createdAt: new Date(),
            name: createTweetDto.name,
            username: createTweetDto.username,
        };
        this.tweets = [tweet, ...this.tweets];
        return tweet;
    }

    update(id: string, text: string) {
        const tweet = this.tweets.find(tweet => tweet.id === id);
        if (tweet) {
            tweet.text = text;
        }
        return tweet;
    }

    remove(id: string) {
        this.tweets = this.tweets.filter(tweet => tweet.id !== id);
    }
}
