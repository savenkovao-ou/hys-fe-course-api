import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./shemas/users.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  public getOne(@Param('id') id: number | string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Ololo-Header', '777')
  public create(@Body() body: CreateUserDto): Promise<User | HttpException> {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public remove(@Param('id') id: string | number): Promise<User> {
    return this.usersService.remove(id);
  }

  // TODO add params validation
  /*
  shared
   export class FindOneParams {
     @IsNumberString()
     id: number;
   }

   @Param() params: FindOneParams,
  * */

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public update(
    @Param('id') id: string | number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }
}
