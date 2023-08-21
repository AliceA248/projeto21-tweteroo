import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: Tweet[] = [];

  signUp(username: string, avatar: string): void {
    const user = new User(username, avatar);
    this.users.push(user);
  }

  postTweet(username: string, tweet: string): void {
    const user = this.users.find(u => u.getUsername() === username);
    if (user) {
      const newTweet = new Tweet(user, tweet);
      this.tweets.push(newTweet);
    }
  }

  getTweets(page: number): Tweet[] {
    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    return this.tweets.slice(start, end);
  }

  getUserTweets(username: string): Tweet[] {
    const user = this.users.find(u => u.getUsername() === username);
    if (user) {
      return this.tweets.filter(tweet => tweet.getUser().getUsername() === username);
    }
    return [];
  }
}
