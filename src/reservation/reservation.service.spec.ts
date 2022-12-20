import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hospital } from '../hospital/entities/hospital.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

// reservation service 로직에 대한 테스트 코드 파일
const mockRepository = () => ({
  // 실제 데이터베이스를 사용해 테스트할 경우 데이터베이스 무결성이 깨질 수 있기 떄문에 Mock 객체를 사용하여 테스트를 진행한다.
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
  })),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: MockRepository<Reservation>;
  let hospitalRepository: MockRepository<Hospital>;

  beforeEach(async () => {
    // 각 테스트 수행 전 실행할 코드
    // 사용하는 모듈에 대한 명시
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Hospital),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get(getRepositoryToken(Reservation));
    hospitalRepository = module.get(getRepositoryToken(Hospital));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update reservation state', () => {
    it('update success', async () => {
      // update가 정상적으로 이루어지는지에 대한 테스트 코드
      const before = {
        id: 1,
        reservationDate: new Date('2022-12-12'),
        timetableIndex: 1,
        faceToface: true,
        approveCheck: 0,
      };

      reservationRepository.findOne.mockResolvedValue(before);

      const after = {
        reservationId: 1,
        state: 1,
      };

      const result = await service.changeReservationState('test_id', after);
      expect(reservationRepository.update).toHaveBeenCalledTimes(1); // update 명령이 한번만 실행되었는지 확인
      expect(result).toEqual({ reservationId: 1, state: '예약 승인' }); // update 함수의 return 값이 예상과 동일한지 확인
    });
  });
});
