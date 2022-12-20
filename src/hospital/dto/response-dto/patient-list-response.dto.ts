import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';

// 병원에 등록된 환자 리스트 조회 요청에 대한 응답 데이터 클래스
class PatientListData {
  @ApiProperty({ description: '환자 아이디' })
  patient_id: number;

  @ApiProperty({ description: '환자 이름' })
  patient_name: string;

  @ApiProperty({ description: '환자 번호' })
  patient_patNumber: string;

  @ApiProperty({ description: '환자 입원일자' })
  patient_inDate: string;

  @ApiProperty({ description: '환자 생년월일' })
  patient_birth: string;

  @ApiProperty({ description: '병동 이름' })
  ward_name: string;

  @ApiProperty({ description: '병실 호수' })
  room_roomNumber: number;
}

export abstract class PatientListResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result',
    example: [
      {
        patient_id: 3,
        patient_name: '두환자',
        patient_patNumber: 'BA1234',
        patient_inDate: '22/01/01',
        patient_birth: '661212',
        ward_name: '201동',
        room_roomNumber: 101,
      },
      {
        patient_id: 4,
        patient_name: '이환자',
        patient_patNumber: 'BA5678',
        patient_inDate: '22/01/01',
        patient_birth: '661212',
        ward_name: '201동',
        room_roomNumber: 102,
      },
    ],
  })
  patient: PatientListData[];
}
