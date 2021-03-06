import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ChangePwDto } from './dto/changePw-user.dto';
import { FindPwDto } from './dto/findPw-user.dto';
import { FriendAddDto } from './dto/friendAdd-user.dto';
import { FriendRemoveDto } from './dto/friendRemove-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() signUpData: SignUpUserDto){
        return await this.userService.register(signUpData);
    };

    @Post('login')
    async login(@Body() loginData: LoginUserDto) {
        return await this.userService.login(loginData);
    };

    @Get('loginCheck')
    loginCheck(@Res() res: any) {
        const user = this.userService.loginCheck(res.locals.user);
        res.status(HttpStatus.OK).send(user);
    };

    @Post('friendAdd')
    async friendAdd(@Body() friendUser: FriendAddDto, @Res() res: any) {
        const msg = await this.userService.friendAdd(friendUser, res.locals.user);
        res.status(HttpStatus.OK).send(msg);
    };

    @Post('friendRemove')
    async friendRemove(@Body() removeUser: FriendRemoveDto, @Res() res: any) {
        const msg = await this.userService.friendRemove(removeUser, res.locals.user);
        res.status(HttpStatus.OK).send(msg);
    };

    @Post('friendList')
    async friendList(@Res() res: any) {
        const friendList = await this.userService.friendList(res.locals.user);
        res.status(HttpStatus.OK).send(friendList);
    };

    @Post('findPw')
    async findPw(@Body() findPw: FindPwDto) {
        return await this.userService.findPw(findPw);
    };

    @Post('changePw')
    async changePw(@Body() changePw: ChangePwDto) {
         return await this.userService.changePw(changePw);
    };

}
