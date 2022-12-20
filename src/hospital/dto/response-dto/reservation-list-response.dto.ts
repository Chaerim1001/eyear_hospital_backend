import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 신청된 면회 리스트 조회 요청에 대한 응답 데이터 클래스
class ReservationResponseData {
  @ApiProperty({ description: '예약 아이디', example: 1 })
  reservation_id: number;

  @ApiProperty({
    description: '면회 접수를 신청한 날짜',
    example: '2022-12-06',
  })
  reservation_createdAt: string;

  @ApiProperty({
    description: '면회 접수를 수정한 날짜',
    example: '2022-12-06',
  })
  reservation_updatedAt: string;

  @ApiProperty({
    description: '면회 예약일 - 면회를 하고자 하는 날',
    example: '2022-12-06',
  })
  reservation_reservationDate: string;

  @ApiProperty({
    description: '면회 시간 인덱스',
    example: 1,
  })
  reservation_timetableIndex: number;

  @ApiProperty({ description: '대면/비대면 여부', example: true })
  reservation_faceToface: boolean;

  @ApiProperty({ description: '승인 여부', example: 0 })
  reservation_approveCheck: number;

  @ApiProperty({
    description: '환자 아이디',
    example: 1,
  })
  reservation_patientId: number;

  @ApiProperty({
    description: '병원 아이디',
    example: 1,
  })
  reservation_hospitalId: number;

  @ApiProperty({
    description: '개인 아이디',
    example: 1,
  })
  reservation_userId: number;
}

export abstract class ReservationListResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: [
      {
        reservation_id: 2,
        reservation_createdAt: '2022-12-15',
        reservation_updatedAt: '2022-12-15',
        reservation_reservationDate: '2022-12-12',
        reservation_timetableIndex: 0,
        reservation_faceToface: 1,
        reservation_approveCheck: 1,
        reservation_hospitalId: 1,
        reservation_userId: 12,
        reservation_patientId: 7,
      },
      {
        reservation_id: 2,
        reservation_createdAt: '2022-12-15',
        reservation_updatedAt: '2022-12-15',
        reservation_reservationDate: '2022-12-12',
        reservation_timetableIndex: 0,
        reservation_faceToface: 1,
        reservation_approveCheck: 1,
        reservation_hospitalId: 1,
        reservation_userId: 12,
        reservation_patientId: 7,
      },
    ],
  })
  reservations: ReservationResponseData[];
}
