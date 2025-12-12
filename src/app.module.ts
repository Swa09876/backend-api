import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, 
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'MY_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
