import { createPaymentDetailsService } from './paymentDetailsService';

import logger from '~/middleware/logger/logger';

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: { warn: jest.fn(), error: jest.fn() }
}));

const textDoc = (value: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: value ? [{ type: 'text', text: value }] : [] }]
});

const tableDoc = (label: string, value: string) => ({
  type: 'doc',
  content: [
    {
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              content: [{ type: 'paragraph', content: label ? [{ type: 'text', text: label }] : [] }]
            },
            {
              type: 'tableCell',
              content: [{ type: 'paragraph', content: value ? [{ type: 'text', text: value }] : [] }]
            }
          ]
        }
      ]
    }
  ]
});

const createService = (getPaymentDetails: jest.Mock) =>
  createPaymentDetailsService({ paymentDetailsRepository: { getPaymentDetails } });

describe('paymentDetailsService.getPublicTabs', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns tabs sorted by their saved order', async () => {
    const service = createService(
      jest.fn().mockResolvedValue({
        tabs: [
          { _id: 'tab-usd', name: 'USD', content: textDoc('USD'), order: 1 },
          { _id: 'tab-uah', name: 'UAH', content: textDoc('UAH'), order: 0 }
        ]
      })
    );

    await expect(service.getPublicTabs()).resolves.toEqual([
      { id: 'tab-uah', name: 'UAH', content: textDoc('UAH'), order: 0 },
      { id: 'tab-usd', name: 'USD', content: textDoc('USD'), order: 1 }
    ]);
  });

  it('converts ObjectId-like ids to strings', async () => {
    const objectId = { toString: () => '507f1f77bcf86cd799439011' };
    const service = createService(
      jest.fn().mockResolvedValue({ tabs: [{ _id: objectId, name: 'UAH', content: textDoc('UAH'), order: 0 }] })
    );

    const [tab] = await service.getPublicTabs();

    expect(tab.id).toBe('507f1f77bcf86cd799439011');
  });

  it('excludes empty, whitespace-only and blank-named tabs', async () => {
    const service = createService(
      jest.fn().mockResolvedValue({
        tabs: [
          { _id: 'filled', name: 'UAH', content: textDoc('IBAN'), order: 0 },
          { _id: 'empty', name: 'USD', content: textDoc(''), order: 1 },
          { _id: 'whitespace', name: 'EUR', content: textDoc('   '), order: 2 },
          { _id: 'empty-table', name: 'PLN', content: tableDoc('', ''), order: 3 },
          { _id: 'blank-name', name: '   ', content: textDoc('IBAN'), order: 4 }
        ]
      })
    );

    const result = await service.getPublicTabs();

    expect(result.map((tab) => tab.id)).toEqual(['filled']);
  });

  it('keeps tabs whose text is inside a table', async () => {
    const service = createService(
      jest.fn().mockResolvedValue({ tabs: [{ _id: 'table', name: 'UAH', content: tableDoc('IBAN', ''), order: 0 }] })
    );

    const result = await service.getPublicTabs();

    expect(result.map((tab) => tab.id)).toEqual(['table']);
  });

  it('skips invalid tabs and logs a warning', async () => {
    const service = createService(
      jest.fn().mockResolvedValue({
        tabs: [
          { _id: 'valid', name: 'UAH', content: textDoc('IBAN'), order: 0 },
          { _id: 'invalid', name: 'USD', content: 'not a doc', order: 1 }
        ]
      })
    );

    const result = await service.getPublicTabs();

    expect(result.map((tab) => tab.id)).toEqual(['valid']);
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['the record is missing', null],
    ['there are no tabs', { tabs: [] }]
  ])('returns an empty list when %s', async (_, value) => {
    const service = createService(jest.fn().mockResolvedValue(value));

    await expect(service.getPublicTabs()).resolves.toEqual([]);
  });

  it('returns an empty list and logs an error when the repository fails', async () => {
    const service = createService(jest.fn().mockRejectedValue(new Error('db error')));

    await expect(service.getPublicTabs()).resolves.toEqual([]);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
