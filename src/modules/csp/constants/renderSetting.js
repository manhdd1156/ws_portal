export const PRICE_LEVEL_OPTIONS = [
    { text: 'Level 1', value: 'unitPrice' },
    { text: 'Level 2', value: 'unitPriceL2' },
    { text: 'Level 3', value: 'unitPriceL3' },
];

export const ACTIVE_OPTIONS = [
    { key: true, value: true, text: 'Có hiệu lực' },
    { key: true, value: false, text: 'Không có hiệu lực' },
    { key: 'all', value: '', text: 'Tất cả' },
];

export const TAX_OPTIONS = [
    { text: 'Không chịu thuế', value: 9, key: 9 },
];

export const ORDER_STATE_OPTIONS = [
    { text: 'Dự thảo', value: 'draft' },
    { text: 'Đã gửi', value: 'sent' },
    { text: 'Hoàn thành', value: 'completed' },
    { text: 'Tất cả', value: '' },
];

export const TAX_NAME = [];
TAX_NAME[5] = 'Thuế suất 5%';
TAX_NAME[9] = 'Không chịu thuế';
