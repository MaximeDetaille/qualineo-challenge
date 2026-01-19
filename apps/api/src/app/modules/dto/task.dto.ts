import { IsOptional, IsString, IsInt } from 'class-validator'
import { Type } from 'class-transformer'

export class GetTasksDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number
}
