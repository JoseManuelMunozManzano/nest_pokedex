import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  // IsPositive permite el 0 y en límit no lo queremos
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}
