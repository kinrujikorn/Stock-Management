import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // เปลี่ยนตามของมึง
      password: 'KNIKNI49996', // เปลี่ยนตามของมึง
      database: 'LovelyBag', // สร้างไว้ก่อน หรือให้ TypeORM สร้างให้ก็ได้
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // true ตอน dev เท่านั้น
    }),
    ProductsModule,
    CategoryModule,
  ],
})
export class AppModule {}
