import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { CardService, } from '../providers/card.service';
import { Card, } from '../entity/card.entity';
import { CreateCardInput, } from '../dto/card.dto';

@Resolver(() => Card)
export class CardResolver {
  constructor(
    private readonly cardService: CardService
  ) {}

  @Mutation(() => Card)
  createCard(@Args('createCardInput') createCardInput: CreateCardInput) {
    return this.cardService.createCard(createCardInput);
  }

  @Query(() => Card)
  getCardById(@Args('id') id: string) {
    return this.cardService.getCard(id);
  }
}
