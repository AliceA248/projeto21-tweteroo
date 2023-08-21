import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-up')
  signUp(@Body('username') username: string, @Body('avatar') avatar: string): void {
    this.appService.signUp(username, avatar);
  }

  @Post('/tweets')
  postTweet(@Body('user') user: string, @Body('tweet') tweet: string): void {
    this.appService.postTweet(user, tweet);
  }

  @Get('/tweets')
  getTweets(@Query('page') page: number): any[] {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  getUserTweets(@Param('username') username: string): any[] {
    return this.appService.getUserTweets(username);
  }
}
