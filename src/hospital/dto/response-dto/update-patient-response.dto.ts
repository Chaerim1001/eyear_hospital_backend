import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../../util/swagger/base-response.dto';
import { UpdatePatientDto } from '../request-dto/update-patient.dto';

// 환자 수정 요청에 대한 응답 데이터 클래스
export abstract class UpdatePatientResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'response result - 수정된 데이터가 전송됩니다.',
  })
  patient: UpdatePatientDto;
}
