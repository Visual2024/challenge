type KeyMapping = {
    [oldKey: string]: string;
};

const DEFAULT_KEY_MAPPINGS: KeyMapping = {
    'opportunity_id': 'id',
    'id': 'id',
    '_id': 'id',
    'id_': 'id',
    'deal_id': 'id',

    'total': 'amount',
    'amount': 'amount',
    'value': 'amount',
    'price': 'amount',

    'rep_name': 'salesperson',
    'agent': 'salesperson',
    'representative': 'salesperson',
    'seller': 'salesperson',

    'sold_at': 'date',
    'created_on': 'date',
    'transaction_date': 'date',
    'deal_date': 'date'
};

export function standardizeKeys<T extends Record<string, unknown>>(obj: Record<string, unknown>, keyMappings: KeyMapping = DEFAULT_KEY_MAPPINGS): T {
    const standardized: Record<string, unknown> = {};

    for (const oldKey in obj) {
        if (obj.hasOwnProperty(oldKey)) {
            const newKey = keyMappings[oldKey] || oldKey;
            standardized[newKey] = obj[oldKey];
        }
    }

    return standardized as T;
}