import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HospitalModule } from 'src/hospital/hospital.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { LocalStrategy } from './strategies/auth-local.strategy';
import { JwtRefreshStrategy } from './strategies/auth-jwt-refresh.strategy';
import { JwtStrategy } from './strategies/auth-jwt.strategy';
// Auth에서 사용하는 module, provider, controller에 대한 연결
@Module({
  imports: [
    HospitalModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Hospital]),
  ],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
