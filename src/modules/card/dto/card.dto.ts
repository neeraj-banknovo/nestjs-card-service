import { InputType, Field, ArgsType, } from '@nestjs/graphql';
import { IsUUID, IsDefined, } from 'class-validator';

@ArgsType()
export class GetCardByIdArgs {
  @IsUUID()
  @IsDefined()
    id: string;
}

@InputType()
export class CreateCardInput {
  @IsUUID()
  @IsDefined()
  @Field(() => String)
    userId: string;

  @IsUUID()
  @IsDefined()
  @Field(() => String)
    accountId: string;

  @IsUUID()
  @IsDefined()
  @Field(() => String)
    nickName: string;
}
