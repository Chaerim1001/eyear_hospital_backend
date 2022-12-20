import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangeStateDto } from '../hospital/dto/request-dto/change-state.dto';
import { ReservationQueryDto } from '../hospital/dto/request-dto/reservation-query.dto';
import { AllReservationResponse } from '../hospital/dto/response-dto/all-reservation-response.dto';
import { ChangeStateResponse } from '../hospital/dto/response-dto/change-state-response.dto';
import { ReservationListResponse } from '../hospital/dto/response-dto/reservation-list-response.dto';
import { ReservationService } from './reservation.service';

@Controller('')
@ApiTags('Reservation API')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('hospital/allReservation') // 'hospital/allReservation' 으로 들어온 Get 요청에 대한 처리를 담당한다.
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '면회 리스트 확인 API',
    description: '면회 리스트 확인 API',
  })
  @ApiOkResponse({
    description: 'success',
    type: AllReservationResponse,
  })
  async getAllReservation(@Req() req: Request, @Res() res: Response) {
    // 전체 면회 리스트 조회에 대한 처리
    const reservations = await this.reservationService.getAllReservation(
      req.user.hospitalId,
    );
    const result = {
      message: 'success',
      reservations: reservations,
    };
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('hospital/reservationList') // 'hospital/reservationList' 으로 들어온 Get 요청에 대한 처리를 담당한다.
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '면회 리스트 확인 API',
    description: '면회 리스트 확인 API',
  })
  @ApiOkResponse({
    description: 'success',
    type: ReservationListResponse,
  })
  async getReservationList(
    // 원하는 날짜의 면회 예약 리스트를 조회 철리
    @Query() query: ReservationQueryDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const reservations = await this.reservationService.getReservationList(
      req.user.hospitalId,
      query.reservationDate,
    );
    const result = {
      message: 'success',
      reservations: reservations,
    };
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('hospital/changeReservationState') //'hospital/changeReservationState' 에 대한 Put 요청에 대한 처리를 담당한다.
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '예약 승인 여부 결정 API',
    description: '예약 승인 여부 결정 API',
  })
  @ApiOkResponse({
    description: 'success',
    type: ChangeStateResponse,
  })
  async changeReservationState(
    @Req() req: Request,
    @Res() res: Response,
    @Body() requestDto: ChangeStateDto,
  ) {
    // 병원에서 개인이 신청한 면회 예약에 대해 승인 또는 거절 처리를 수행하는 함수
    const reservation = await this.reservationService.changeReservationState(
      req.user.hospitalId,
      requestDto,
    );
    const result = {
      message: 'success',
      result: reservation,
    };
    return res.status(HttpStatus.OK).json(result);
  }
}
