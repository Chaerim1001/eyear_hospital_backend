import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospitalDto } from './dto/request-dto/create-hospital.dto';
import { Hospital } from './entities/hospital.entity';
import { hash } from 'bcrypt';
import { IdCheckDto } from './dto/request-dto/id-check.dto';
import { CreateWardDto } from './dto/request-dto/create-ward.dto';
import { Ward } from './entities/ward.entity';
import { CreateRoomDto } from './dto/request-dto/create-room.dto';
import { Room } from './entities/room.entity';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/request-dto/create-patient.dto';
import { Reservation } from '../reservation/entities/reservation.entity';
import { UpdateWardDto } from './dto/request-dto/update-ward.dto';
import { DeleteWardDto } from './dto/request-dto/delete-ward.dto';
import { UpdateRoomDto } from './dto/request-dto/update-room.dto';
import { DeleteRoomDto } from './dto/request-dto/delete-room.dto';
import { UpdatePatientDto } from './dto/request-dto/update-patient.dto';
import { DeletePatientDto } from './dto/request-dto/delete-patient.dto';

@Injectable()
export class HospitalService {
  constructor(
    // 사용하고자하는 데이터베이스 테이블에 대한 의존성 주입 및 repository 생성
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {
    this.hospitalRepository = hospitalRepository;
    this.wardRepository = wardRepository;
    this.roomRepository = roomRepository;
    this.patientRepository = patientRepository;
    this.reservationRepository = reservationRepository;
  }

  async create(requestDto: CreateHospitalDto): Promise<any> {
    // 병원 회원가입 처리 함수
    // 요청 받은 hospitalId와 password를 사용해 회원가입을 진행한다.
    const isExist = await this.hospitalRepository.findOneBy({
      hospitalId: requestDto.hospitalId,
    });

    if (isExist) {
      // 이미 동일한 아이디를 가진 병원이 있을 경우 에러를 발생시킨다.
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Already registered id'],
        error: 'Forbidden',
      });
    }

    // password는 암호화하여 저장한다.
    requestDto.password = await hash(
      requestDto.password,
      parseInt(process.env.HASH_NUMBER),
    );

    const { password, currentHashedRefreshToken, ...result } =
      await this.hospitalRepository.save(requestDto);
    return result;
  }

  async idCheck(requestDto: IdCheckDto) {
    // hospitalId가 중복되는 아이디가 있는지 확인하는 함수
    const isExist = await this.hospitalRepository.findOneBy({
      hospitalId: requestDto.hospitalId,
    });

    if (isExist) {
      return {
        result: true,
        text: '이미 존재하는 아이디입니다.',
      };
    }

    return {
      result: false,
      text: '사용 가능한 아이디입니다.',
    };
  }

  async createWard(
    // 병동 생성 함수
    requestDto: CreateWardDto,
    hospitalId: string,
  ): Promise<any> {
    const existedHospital = await this.findHospital(hospitalId);

    if (existedHospital) {
      const { id } = existedHospital;
      const wardName = requestDto.name;

      const isExist = await this.findWard(id, wardName);

      if (isExist.length != 0) {
        // 병동 생성을 요청한 병원에 해당 병동이 이미 있는 경우 에러를 발생시킨다.
        throw new ForbiddenException({
          statusCode: HttpStatus.FORBIDDEN,
          message: ['Already registered ward'],
          error: 'Forbidden',
        });
      }
    }

    const { id, name } = await this.wardRepository.save({
      name: requestDto.name,
      hospital: existedHospital,
    });

    const result = {
      id: id,
      name: name,
    };
    return result;
  }

  async findHospital(hospitalId: string): Promise<Hospital> {
    // 병원 아이디를 사용해 병원 정보를 조회하는 함수
    const hospital = await this.hospitalRepository.findOneBy({
      hospitalId,
    });

    if (hospital) {
      return hospital;
    }

    throw new ForbiddenException({
      statusCode: HttpStatus.FORBIDDEN,
      message: ['Not Existed Hospital'],
      error: 'Forbidden',
    });
  }

  async createRoom(
    requestDto: CreateRoomDto,
    hospitalId: string,
  ): Promise<any> {
    // 병실 생성 함수
    const hospital = await this.findHospital(hospitalId);
    const ward = await this.findWard(hospital.id, requestDto.wardName);

    if (ward.length < 1) {
      // 요청 병동이 있는지부터 확인한다.
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Not Existed Ward'],
        error: 'Forbidden',
      });
    }

    const requestRoomNumber = requestDto.roomNumber;
    const wardId = ward[0].id;
    const isExist = await this.findRoom(wardId, requestRoomNumber);

    if (isExist.length != 0) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Already registered patient'],
        error: 'Forbidden',
      });
    }

    // 요청 병동에 해당 병실을 생성한다.
    const { id, roomNumber } = await this.roomRepository.save({
      ward: ward[0],
      currentPatient: 0,
      ...requestDto,
    });

    const result = {
      id: id,
      roomNumber: roomNumber,
    };
    return result;
  }

  async findWard(id: number, wardName: string): Promise<Ward[]> {
    // 병동 이름을 사용하여 해당 병원에 병동이 있는지 조회한다.
    const ward = await this.wardRepository
      .createQueryBuilder('ward')
      .select()
      .where('ward.name = :wardName', { wardName })
      .andWhere('ward.hospitalId = :id', { id })
      .getMany();

    if (ward.length > 1) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['병원 및 병동 정보가 올바르지 않습니다.'],
        error: 'Forbidden',
      });
    }

    return ward;
  }

  async findRoom(wardId: number, roomNumber: number): Promise<Room[]> {
    // 병실 번호를 사용하여 병실이 존재하는지 확인하는 함수
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .select()
      .where('room.roomNumber = :roomNumber', { roomNumber })
      .andWhere('room.wardId = :wardId', { wardId })
      .getMany();

    if (room.length > 1) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['병동 및 병실 정보가 올바르지 않습니다.'],
        error: 'Forbidden',
      });
    }

    return room;
  }

  async createPatient(requestDto: CreatePatientDto, hospitalId: string) {
    // 환자 등록 함수
    // 환자 등록을 원하는 병동 및 병실 정보가 올바른지 확인 후 환자 등록을 진행한다.
    const hospital = await this.findHospital(hospitalId);
    const ward = await this.findWard(hospital.id, requestDto.wardName);
    if (ward.length < 1) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['병동 정보가 올바르지 않습니다.'],
        error: 'Forbidden',
      });
    }

    const room = await this.findRoom(ward[0].id, requestDto.roomNumber);
    if (room.length < 1) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['병실 정보가 올바르지 않습니다.'],
        error: 'Forbidden',
      });
    }

    if (room[0].currentPatient >= room[0].limitPatient) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['병실 수용 가능 인원이 가득 찼습니다.'],
        error: 'Forbidden',
      });
    }

    const isExist = await this.patientRepository.findOneBy({
      infoNumber: requestDto.infoNumber,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['이미 등록된 환자입니다'],
        error: 'Forbidden',
      });
    }

    const { id, name, patNumber, infoNumber } =
      await this.patientRepository.save({
        hospital: hospital,
        ward: ward[0],
        room: room[0],
        ...requestDto,
      });

    await this.roomRepository.update(room[0].id, {
      currentPatient: room[0].currentPatient + 1,
    });

    const result = {
      id: id,
      name: name,
      patNumber: patNumber,
      infoNumber: infoNumber,
    };

    return result;
  }

  async getMainData(hospitalId: string) {
    // 병원 메인 페이지에 표시할 데이터를 조회하는 함수
    const OFFSET = 1000 * 60 * 60 * 9;
    const day = new Date(new Date().getTime() + OFFSET);
    const today = day.toISOString().split('T')[0];

    day.setDate(day.getDate() - 1);
    const yesterday = day.toISOString().split('T')[0];

    // 오늘 도착한 영상 편지 조회
    const posts = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .select('post.id')
      .addSelect('post.check')
      .addSelect('post.patientId')
      .leftJoin('hospital.posts', 'post')
      .where('hospital.hospitalId = :hospitalId', { hospitalId })
      .andWhere('date_format(post.createdAt, "%Y-%m-%d") = :yesterday', {
        yesterday,
      })
      .execute();

    for (const index in posts) {
      const patient = await this.patientRepository.findOne({
        where: {
          id: posts[index].patient_id,
        },
        relations: ['ward', 'room'],
      });

      if (patient) {
        posts[index]['patient_name'] = patient.name;
        posts[index]['patient_number'] = patient.patNumber;
        posts[index]['patient_ward'] = patient.ward.name;
        posts[index]['patient_roomNumber'] = patient.room.roomNumber;
      }
    }

    // 오늘 예약된 면회 리스트 조회
    const reservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('reservation.createdAt')
      .addSelect('reservation.reservationDate')
      .addSelect('reservation.timetableIndex')
      .addSelect('patient.patNumber')
      .addSelect('patient.name')
      .addSelect('ward.name')
      .addSelect('room.roomNumber')
      .leftJoin('reservation.hospital', 'hospital')
      .leftJoin('reservation.patient', 'patient')
      .leftJoin('patient.room', 'room')
      .leftJoin('patient.ward', 'ward')
      .where('hospital.hospitalId =:hospitalId', { hospitalId })
      .andWhere(
        'date_format(reservation.reservationDate, "%Y-%m-%d") = :today',
        {
          today,
        },
      )
      .andWhere('reservation.faceToface =:faceToface', { faceToface: false })
      .andWhere('reservation.approveCheck =:approveCheck', {
        approveCheck: 1,
      })
      .execute();

    for (const reservation of reservations) {
      const createdAt_temp = reservation.reservation_createdAt
        .toISOString()
        .split('T')[0];
      const createdAt_temp2 = createdAt_temp.split('-');
      reservation.reservation_createdAt =
        createdAt_temp2[0].substring(2) +
        '/' +
        createdAt_temp2[1] +
        '/' +
        createdAt_temp2[2];

      const reservationDate_temp = reservation.reservation_reservationDate
        .toISOString()
        .split('T')[0];
      const reservationDate_temp2 = reservationDate_temp.split('-');
      reservation.reservation_reservationDate =
        reservationDate_temp2[0].substring(2) +
        '/' +
        reservationDate_temp2[1] +
        '/' +
        reservationDate_temp2[2];
    }

    return { posts: posts, reservations: reservations };
  }

  // 병원에 등록된 환자 정보를 조회하는 함수
  async getPatients(hospitalId: string) {
    const patients = await this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.id')
      .addSelect('patient.name')
      .addSelect('patient.patNumber')
      .addSelect('patient.inDate')
      .addSelect('patient.birth')
      .addSelect('ward.name')
      .addSelect('room.roomNumber')
      .leftJoin('patient.hospital', 'hospital')
      .leftJoin('patient.ward', 'ward')
      .leftJoin('patient.room', 'room')
      .where('hospital.hospitalId = :hospitalId', { hospitalId })
      .execute();

    for (const patient of patients) {
      const birth_temp = patient.patient_birth.toISOString().split('T')[0];
      const birth_temp2 = birth_temp.split('-');
      patient.patient_birth =
        birth_temp2[0].substring(2) + birth_temp2[1] + birth_temp2[2];

      const inDate_temp = patient.patient_inDate.toISOString().split('T')[0]; // 2022-12-12
      const inDate_temp2 = inDate_temp.split('-');
      patient.patient_inDate =
        inDate_temp2[0].substring(2) +
        '/' +
        inDate_temp2[1] +
        '/' +
        inDate_temp2[2];
    }

    return patients;
  }

  // 병원에 등록된 병동 정보를 조회하는 함수
  async getWardList(hospitalId: string) {
    const wards = await this.wardRepository
      .createQueryBuilder('ward')
      .select('ward.id')
      .addSelect('ward.name')
      .leftJoin('ward.hospital', 'hospital')
      .where('hospital.hospitalId = :hospitalId', { hospitalId })
      .execute();

    return wards;
  }

  // 병원에 등록된 병실 정보를 조회하는 함수
  async getRoomList(hospitalId: string) {
    const wards = await this.getWardList(hospitalId);
    const result = [];

    for (const ward of wards) {
      const wardId = ward.ward_id;

      const rooms = await this.roomRepository
        .createQueryBuilder('room')
        .select('room.id')
        .addSelect('room.roomNumber')
        .addSelect('room.createdAt')
        .addSelect('room.currentPatient')
        .addSelect('room.icuCheck')
        .leftJoin('room.ward', 'ward')
        .where('ward.id = :wardId', { wardId })
        .execute();

      for (const room of rooms) {
        const createdAt_temp = room.room_createdAt.toISOString().split('T')[0];
        const createdAt_temp2 = createdAt_temp.split('-');

        result.push({
          ward_id: ward.ward_id,
          ward_name: ward.ward_name,
          room_id: room.room_id,
          room_createdAt:
            createdAt_temp2[0].substring(2) +
            '/' +
            createdAt_temp2[1] +
            '/' +
            createdAt_temp2[2],
          room_number: room.room_roomNumber,
          room_currentPatient: room.room_currentPatient,
          room_icuCheck: room.room_icuCheck,
        });
      }
    }
    return result;
  }

  // 병동 정보를 수정하는 함수
  async updateWard(requestDto: UpdateWardDto, hospitalId: string) {
    const hospital = await this.findHospital(hospitalId);

    const ward = await this.wardRepository
      .createQueryBuilder('ward')
      .select('ward')
      .where('ward.id =:id', { id: requestDto.id })
      .andWhere('ward.hospitalId =:hospitalId', { hospitalId: hospital.id })
      .execute();

    if (ward.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['병원과 병동 정보가 올바르지 않습니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.wardRepository.update(
      { id: requestDto.id },
      { name: requestDto.name },
    );

    if (result.affected > 0) {
      return requestDto;
    }
  }

  // 병동을 삭제하는 함수
  async deleteWard(requestDto: DeleteWardDto, hospitalId: string) {
    const hospital = await this.findHospital(hospitalId);

    const ward = await this.wardRepository
      .createQueryBuilder('ward')
      .select('ward')
      .where('ward.id =:id', { id: requestDto.id })
      .andWhere('ward.hospitalId =:hospitalId', { hospitalId: hospital.id })
      .execute();

    if (ward.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['병원과 병동 정보가 올바르지 않습니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.wardRepository.delete({ id: requestDto.id });
    if (result.affected > 0) {
      return 'success';
    }
  }

  // 병실 정보를 수정하는 함수
  async updateRoom(hospitalId: string, requestDto: UpdateRoomDto) {
    const hospital = await this.findHospital(hospitalId);

    const { id, ...updateData } = requestDto;
    const room = await this.roomRepository.findOne({
      where: { id: id },
      relations: { ward: true },
    });

    if (!room) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['존재하지 않는 병실입니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const ward = await this.findWard(hospital.id, room.ward.name);

    if (ward.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['올바르지 않은 병실 정보입니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.roomRepository.update({ id }, updateData);

    if (result.affected > 0) {
      return requestDto;
    }
  }

  // 병실을 삭제하는 함수
  async deleteRoom(hospitalId: string, requestDto: DeleteRoomDto) {
    const hospital = await this.findHospital(hospitalId);
    const room = await this.roomRepository.findOne({
      where: { id: requestDto.id },
      relations: { ward: true },
    });

    if (!room) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['존재하지 않는 병실입니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const ward = await this.findWard(hospital.id, room.ward.name);

    if (ward.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['올바르지 않은 병실 정보입니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.roomRepository.delete({ id: requestDto.id });

    if (result.affected > 0) {
      return 'success';
    }
  }

  // 환자 정보를 수정하는 함수
  async updatePatient(requestDto: UpdatePatientDto, hospitalId: string) {
    const hospital = await this.findHospital(hospitalId);

    const { id, ...updateData } = requestDto;
    const patient = await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.id =:id', { id })
      .andWhere('patient.hospitalId =:hospitalId', { hospitalId: hospital.id })
      .execute();

    if (patient.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['병원과 환자 정보가 올바르지 않습니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.patientRepository.update({ id }, updateData);
    if (result.affected > 0) {
      return requestDto;
    }
  }

  // 환자를 삭제하는 함수
  async deletePatient(requestDto: DeletePatientDto, hospitalId: string) {
    const hospital = await this.findHospital(hospitalId);

    const patient = await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.id =:id', { id: requestDto.id })
      .andWhere('patient.hospitalId =:hospitalId', { hospitalId: hospital.id })
      .execute();

    if (patient.length != 1) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['병원과 환자 정보가 올바르지 않습니다.'],
        error: 'BAD_REQUEST',
      });
    }

    const result = await this.patientRepository.delete({ id: requestDto.id });
    if (result.affected > 0) {
      return 'success';
    }
  }
}
