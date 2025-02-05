import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt({ message: 'Not a number' })
  @IsPositive({ message: 'Not a positive number' })
  @Min(1, { message: 'Min value is 1' })
  number: number;
  @IsString({ message: 'Not a string' })
  @MinLength(1, { message: 'Minimum length 1' })
  name: string;
}
