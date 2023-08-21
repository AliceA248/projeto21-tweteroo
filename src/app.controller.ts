import { Controller, Get, Post, Body, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): string {
    return "I'm okay!";
  }

  @Post('/sign-up')
  signUp(@Body() body: { username: string; avatar: string }): string {
    const { username, avatar } = body;
    if (!username || typeof username !== 'string' || !avatar || typeof avatar !== 'string') {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    this.appService.signUpUser(username, avatar);
    return 'OK';
  }

  @Post('/tweets')
  createTweet(@Body() body: { username: string; tweet: string }): string {
    const { username, tweet } = body;
    if (!username || typeof username !== 'string' || !tweet || typeof tweet !== 'string') {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    if (!this.appService.getUser(username)) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    this.appService.createTweet(username, tweet);
    return 'OK';
  }

  @Get('/tweets')
  getTweets(@Query('page') page?: number): any[] {
    if (page && (isNaN(page) || page < 1)) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }

    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  getTweetsByUsername(@Param('username') username: string): any[] {
    const user = this.appService.getUser(username);
    if (!user) {
      return [];
    }

    return this.appService.getTweetsByUsername(username);
  }
}
