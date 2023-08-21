// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly tweets = [];
  private readonly users = [];

  signUpUser(username: string, avatar: string): void {
    this.users.push({ username, avatar });
  }

  createTweet(username: string, tweet: string): void {
    this.tweets.push({ username, tweet });
  }
  getLatestTweets(limit: number): any[] {
    const startIndex = Math.max(0, this.tweets.length - limit);
    return this.tweets.slice(startIndex);
  }


  getTweets(page: number): any[] {
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return this.tweets.slice(startIndex, endIndex);
  }

  getTweetsByUsername(username: string): any[] {
    return this.tweets.filter(tweet => tweet.username === username);
  }

  getUser(username: string): any {
    return this.users.find(user => user.username === username);
  }
}


