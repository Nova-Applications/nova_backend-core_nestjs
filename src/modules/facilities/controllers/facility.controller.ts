import {
  Req,
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Put,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../../common/filters/http-exception.filter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ResponseFilter } from '../../../common/interceptors/response.interceptor';
import { Request } from 'express';
import { FacilityModel } from '../entities/facility';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateFacilityCommand } from '../commands/create-facility/create-facility.command';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../shared/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { getFileFromRequest } from '../../../shared/utilities/helpers';
import { FacilityInfoQuery } from '../queries/facility-info/facility-info.query';
import { AddFacilityImageCommand } from '../commands/add-facility-image/add-facility-image.command';
import { DeleteFacilityImageCommand } from '../commands/delete-facility-image/delete-facility-image.command';

@Controller('facilities')
@ApiTags('facilities')
@UseInterceptors(ResponseFilter)
@UseFilters(HttpExceptionFilter)
export class FacilityController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  @Post('/create')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  public async createFacility(
    @Body() facility: FacilityModel,
    @Req() request: Request,
  ) {
    const currentUser =
      request[this.configService.get<string>('app.jwt.secret.name')];
    const command = new CreateFacilityCommand(
      facility.title,
      facility.address,
      facility.ubigeo,
      facility.latitude,
      facility.longitude,
      facility.capacity,
      facility.courtsTotal,
      currentUser.id,
    );
    return await this.commandBus.execute(command);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  public async getById(@Param('id') id: string, @Req() request: Request) {
    const currentUser =
      request[this.configService.get<string>('app.jwt.secret.name')];
    const query = new FacilityInfoQuery(currentUser.id, id);
    return await this.queryBus.execute(query);
  }

  @Put('/:id/add-image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  public async addFacilityImage(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const currentUser =
      request[this.configService.get<string>('app.jwt.secret.name')];
    const file = getFileFromRequest(request);
    const command = new AddFacilityImageCommand(currentUser.id, id, file);
    return await this.commandBus.execute(command);
  }

  @Delete('/:facilityId/images/:imageId')
  @UseGuards(AuthGuard)
  public async removeFacilityImage(
    @Param('facilityId') facilityId: string,
    @Param('imageId') imageId: string,
    @Req() request: Request,
  ) {
    const currentUser =
      request[this.configService.get<string>('app.jwt.secret.name')];
    const command = new DeleteFacilityImageCommand(
      currentUser.id,
      facilityId,
      imageId,
    );
    return await this.commandBus.execute(command);
  }
}
