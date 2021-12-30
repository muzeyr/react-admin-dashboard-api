import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  
  @ApiProperty({
    uniqueItems: true,
    example: '1 ETH',
  })
  name: string;

  @ApiProperty({
    uniqueItems: true,
    example: '0.04791411',
  })
  value: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'BTC',
  })
  unit: string;
  
  
}
