import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';
// 병원 메인 홈페이지에 표시할 데이터 클래스 -->  오늘 도착한 영상 우편 리스트 + 오늘 예약된 면회 리스트
class PostData {
  @ApiProperty({
    description: '영상 id',
    example: 1,
  })
  post_id: number;

  @ApiProperty({
    description: '영상 확인 여부',
    example: true,
  })
  post_check: boolean;

  @ApiProperty({
    description: '환자 아이디',
    example: 1,
  })
  patient_id: number;

  @ApiProperty({
    description: '환자 이름',
    example: '박환자',
  })
  patient_name: string;

  @ApiProperty({
    description: '환자 번호',
    example: 'PA1234',
  })
  patient_number: string;

  @ApiProperty({
    description: '병동 이름',
    example: '201동',
  })
  patient_ward: string;

  @ApiProperty({
    description: '병실 번호',
    example: 101,
  })
  patient_roomNumber: number;
}

class ReservationData {
  @ApiProperty({
    description: '면회를 신청한 날짜',
    example: '22/12/12',
  })
  reservation_createdAt: string;

  @ApiProperty({
    description: '면회를 원하는 날짜',
    example: '22/12/12',
  })
  reservation_reservationDate: string;

  @ApiProperty({
    description: '면회 시간 인덱스',
    example: 1,
  })
  reservation_timetableIndex: number;

  @ApiProperty({
    description: '환자 이름',
    example: '박노인',
  })
  patient_name: string;

  @ApiProperty({
    description: '환자 번호',
    example: 'PA1234',
  })
  patient_patNumber: string;

  @ApiProperty({
    description: '병실 번호',
    example: 201,
  })
  room_roomNumber: number;

  @ApiProperty({
    description: '병동 이름',
    example: '201동',
  })
  ward_name: string;
}

export abstract class HospitalMainResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: '오늘 도착한 영상 우편 리스트',
    example: [
      {
        post_id: 5,
        patient_id: 1,
        post_check: 0,
        patient_name: '박노인',
        patient_number: 'P123',
        patient_ward: 'ward_test_name',
        patient_roomNumber: 100,
      },
      {
        post_id: 6,
        patient_id: 1234,
        post_check: 1,
        patient_name: '박노인',
        patient_number: 'P123',
        patient_ward: 'ward_test_name',
        patient_roomNumber: 100,
      },
    ],
  })
  today_posts: PostData[];

  @ApiProperty({
    description: '오늘의 비대면 면회 신청 리스트',
    example: [
      {
        reservation_createdAt: '22/12/17',
        reservation_reservationDate: '22/12/17',
        reservation_timetableIndex: 1,
        patient_name: '일환자',
        patient_patNumber: 'PA123',
        room_roomNumber: 102,
        ward_name: '104동',
      },
      {
        reservation_createdAt: '22/12/17',
        reservation_reservationDate: '22/12/17',
        reservation_timetableIndex: 1,
        patient_name: '일환자',
        patient_patNumber: 'PA123',
        room_roomNumber: 102,
        ward_name: '104동',
      },
    ],
  })
  today_reservations: ReservationData[];
}
