import { ReqHospitalDto } from 'src/hospital/dto/request-dto/req-hospital.dto';
// Request 객체 global 재정의
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends ReqHospitalDto {}
  }
}
