import { Injectable } from '@nestjs/common';
import { CARD_CATEGORY, CARD_STATUS, CARD_VENDOR } from '../enums/card.enums';
import { v4 as uuidv4 } from 'uuid';

interface DummyCard {
    external_card_id: string;
    vendor: string;
    category: string;
    type: string;
    last_four: string;
    status: string;
    expiry: string;
};

function generate(): string { 
    return Math.floor(Math.random() * 1E16).toString();
}

@Injectable()
export class UtilService{
    constructor() { }
    
    public generateCard(): DummyCard { 
        return {
            vendor: CARD_VENDOR.PRIVACY,
            category: CARD_CATEGORY.VIRTUAL,
            type: 'SINGLE_USE',
            last_four: generate().slice(12),
            status: CARD_STATUS.ACTIVE,
            expiry: '12/2025',
            external_card_id: uuidv4()
        } as DummyCard;
    }
}
