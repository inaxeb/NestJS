import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Utilisateurs')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Créer un compte utilisateur' })
  @Post('signup')
  async signup(@Body() registerDto: RegisterDto) {
    return this.userService.signup(registerDto);
  }

  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @Post('signin')
  async signin(@Body() loginDto: LoginDto) {
    return this.userService.signin(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer les informations de l utilisateur' })
  @Get('me')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
