import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength } from "class-validator"

export class TodoDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    title: string

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    description: string
}