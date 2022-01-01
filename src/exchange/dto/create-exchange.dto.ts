import { ApiProperty } from '@nestjs/swagger';

export class CreateExchangeDto {

  @ApiProperty({
    uniqueItems: true,
    example: 'ETH',
  })
  fromCoin: string;

  @ApiProperty({
    uniqueItems: true,
    example: '0.300',    
  })
  fromQuantity: number;

  @ApiProperty({
    uniqueItems: true,
    example: '0.04791411',    
  })
  fromValue: number;
  

  @ApiProperty({
    minLength: 1,
    example: '1:Alım,-1:Satım',
  })
  type: number;

  @ApiProperty({
    minLength: 1,
    example: 'User',
  })
  user: Object;
}
