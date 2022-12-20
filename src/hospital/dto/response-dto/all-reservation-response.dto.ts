import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 면회 리스트 조회 요청에 대한 응답 데이터 클래스
class ReservationData {
  @ApiProperty({ description: '면회 예약 아이디', example: 1 })
  reservation_id: number;

  @ApiProperty({ description: '면회 신청 날짜', example: '22/12/12' })
  reservation_reservationDate: string;

  @ApiProperty({ description: '면회를 하고자 하는 날짜', example: '22/12/12' })
  reservation_timetableIndex: number;

  @ApiProperty({ description: '대면 면회 여부', example: true })
  reservation_faceToface: boolean;

  @ApiProperty({ description: '면회 예약 승인 여부', example: 1 })
  reservation_approveCheck: number;

  @ApiProperty({ description: '환자 이름', example: '박노인' })
  patient_name: string;

  @ApiProperty({ description: '환자 번호', example: 'PA1234' })
  patient_patNumber: string;

  @ApiProperty({ description: '병실 번호', example: 230 })
  room_roomNumber: number;

  @ApiProperty({ description: '병동 이름', example: '201동' })
  ward_name: string;
}

class ALlReservationResponseData {
  @ApiProperty({ description: '승인 여부 확인 안함' })
  '0': ReservationData[];

  @ApiProperty({ description: '승인' })
  '1': ReservationData[];

  @ApiProperty({ description: '거부' })
  '-1': ReservationData[];
}

export abstract class AllReservationResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: '전체 면회 예약 리스트',
    example: {
      '0': [
        {
          reservation_id: 10,
          reservation_createdAt: '22/12/15',
          reservation_reservationDate: '22/12/02',
          reservation_timetableIndex: 0,
          reservation_faceToface: 1,
          reservation_approveCheck: 0,
          patient_name: '일환자',
          patient_patNumber: 'PA123',
          room_roomNumber: 102,
          ward_name: '104동',
        },
      ],
      '1': [
        {
          reservation_id: 2,
          reservation_createdAt: '22/12/15',
          reservation_reservationDate: '22/12/12',
          reservation_timetableIndex: 0,
          reservation_faceToface: 1,
          reservation_approveCheck: 1,
          patient_name: '일환자',
          patient_patNumber: 'PA123',
          room_roomNumber: 102,
          ward_name: '104동',
        },
        {
          reservation_id: 3,
          reservation_createdAt: '22/12/15',
          reservation_reservationDate: '22/12/12',
          reservation_timetableIndex: 0,
          reservation_faceToface: 1,
          reservation_approveCheck: 1,
          patient_name: '일환자',
          patient_patNumber: 'PA123',
          room_roomNumber: 102,
          ward_name: '104동',
        },
      ],
      '-1': [
        {
          reservation_id: 11,
          reservation_createdAt: '22/12/15',
          reservation_reservationDate: '22/12/11',
          reservation_timetableIndex: 0,
          reservation_faceToface: 1,
          reservation_approveCheck: -1,
          patient_name: '일환자',
          patient_patNumber: 'PA123',
          room_roomNumber: 102,
          ward_name: '104동',
        },
      ],
    },
  })
  reservations: ALlReservationResponseData;
}
