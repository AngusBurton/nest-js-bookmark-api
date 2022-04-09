import {
  Controller,
  Body,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/index';
import { JwtGuard } from '../auth/guard/index';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// globally add jwt guard to routes below
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // GET /users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(
    @Body() dto: EditUserDto,
    @GetUser('id') userId: number,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
