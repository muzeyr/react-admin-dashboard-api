import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @ApiProperty({
    minLength: 6,
    example: 'Id',
  })
  id: number;

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
    example: 'Coins',
  })
  exchanges: any[];

}