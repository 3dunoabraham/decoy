import { EMPTY_UNIT_RES } from '@/scripts/constants/unit';

export const OFFLINE_UNITS_ARRAY = [
    {...EMPTY_UNIT_RES,...{sales_status:1,vin:"123456789",dealer:"Dealer #1"}},
    {...EMPTY_UNIT_RES,...{sales_status:2,vin:"000000000"}},
    {...EMPTY_UNIT_RES,...{sales_status:1,vin:"000000000"}},
    {...EMPTY_UNIT_RES,...{sales_status:1,vin:"000033333"}},
    {...EMPTY_UNIT_RES,...{sales_status:4,vin:"000000000",dealer:"Dealer #3"}},
]