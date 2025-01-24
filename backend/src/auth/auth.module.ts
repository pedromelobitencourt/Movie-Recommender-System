// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { ConfigService } from '@nestjs/config';
// import { UserModule } from '../user/user.module';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'), // Obtém do .env
//         signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
//       }),
//     }),
//     UserModule,
//   ],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}
