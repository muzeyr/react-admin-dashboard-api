import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty({
    uniqueItems: true,
    example: 'muzeyr@gmail.com',
  })
  email: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'Uzeyr',    
  })
  name: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'Avatar',  
    default: 'http://zcntech.com/wp-content/uploads/2016/05/profile.png'  
  })
  avatar: string;

  @ApiProperty({
    minLength: 1,
    example: 'OZCAN',
  })
  surname: string;

  @ApiProperty({
    minLength: 6,
    example: '*****',
  })
  password: string;

  @ApiProperty({
    minLength: 6,
    example: 'Coins ',
  })
  exchanges: any[];
}
