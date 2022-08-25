import { ObjectType, Field, } from '@nestjs/graphql';
import { CardCategory, CardStatus, CardVendor, } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ICard, } from '../card.interface';

@Entity({ name: 'cards', })
@ObjectType('Card')
export class Card implements ICard {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: CardVendor,
    default: CardVendor.PRIVACY,
  })
    vendor: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: CardCategory,
    default: CardCategory.VIRTUAL,
  })
    category: string;

  @Field(() => String)
  @Column({ type: 'text', })
    type: string;

  @Field(() => String)
  @Column({ type: 'text', })
    external_card_id: string;

  @Field(() => String)
  @Column({ type: 'text', })
    user_id: string;

  @Field(() => String)
  @Column({ type: 'text', })
    account_id: string;

  @Field(() => String)
  @Column({ type: 'text', })
    nick_name: string;

  @Field(() => String)
  @Column({ type: 'text', })
    last_four: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: CardStatus,
    default: CardStatus.ACTIVE,
  })
    status: string;

  @Field(() => String)
  @Column({ type: 'text', })
    expiry: string;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp', })
    created_at: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamp', })
    updated_at: Date;
}
