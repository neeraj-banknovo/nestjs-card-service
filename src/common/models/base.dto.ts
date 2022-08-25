import { ObjectType, } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, ValidateNested, } from 'class-validator';

@ObjectType({ isAbstract: true, })
export class GenericPayload<T> {
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  public data!: T;
}
