import type { ArchiveServiceDeps } from '~/domain/services/archive.type';
import { createArchiveService } from '~/services/composed/archive-service/archiveService';

const uk = 'uk' as const;
const en = 'en' as const;

const raw = {
  fund: '2',
  caseSlug: 'op1-spr3',
  title: { uk: 'Трудова діяльність', en: 'Work activity' },
  code: 'Ф. 2, оп. 1, спр. 3',
  dates: '1895–1955',
  sheetsCount: 26,
  items: [
    { order: 2, text: { uk: 'Документ Б', en: 'Document B' } },
    { order: 1, text: { uk: 'Документ А', en: 'Document A' } }
  ],
  pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
  prev: { href: '/uk/archive/fund/2/case/op1-spr2', title: { uk: 'Попередня назва', en: 'Previous title' } },
  next: null
};

describe('archiveService', () => {
  let deps: ArchiveServiceDeps;

  beforeEach(() => {
    deps = {
      archiveService: {
        getCaseDetail: jest.fn()
      }
    };
  });

  it('returns localized, validated data (uk) and sorts items by order', async () => {
    (deps.archiveService.getCaseDetail as jest.Mock).mockResolvedValue(raw);
    const service = createArchiveService(deps);

    const res = await service.getCase(uk, '2', 'op1-spr3');

    expect(res).toEqual({
      id: '2-op1-spr3',
      fund: '2',
      caseSlug: 'op1-spr3',
      title: 'Трудова діяльність',
      code: 'Ф. 2, оп. 1, спр. 3',
      dates: '1895–1955',
      sheetsCount: 26,
      items: [
        { order: 1, text: 'Документ А' },
        { order: 2, text: 'Документ Б' }
      ],
      pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
      prev: { href: '/uk/archive/fund/2/case/op1-spr2', title: 'Попередня назва' },
      next: null
    });

    expect(deps.archiveService.getCaseDetail).toHaveBeenCalledWith('2', 'op1-spr3');
  });

  it('localizes to EN', async () => {
    (deps.archiveService.getCaseDetail as jest.Mock).mockResolvedValue(raw);
    const service = createArchiveService(deps);

    const res = await service.getCase(en, '2', 'op1-spr3');

    expect(res?.title).toBe('Work activity');
    expect(res?.items[0].text).toBe('Document A');
    expect(res?.prev?.title).toBe('Previous title');
  });

  it('returns null when not found', async () => {
    (deps.archiveService.getCaseDetail as jest.Mock).mockResolvedValue(null);
    const service = createArchiveService(deps);

    const res = await service.getCase(uk, '2', 'op1-spr3');

    expect(res).toBeNull();
  });

  it('throws on invalid shape', async () => {
    (deps.archiveService.getCaseDetail as jest.Mock).mockResolvedValue({ ...raw, code: undefined });
    const service = createArchiveService(deps);

    await expect(service.getCase(uk, '2', 'op1-spr3')).rejects.toThrow();
  });
});
