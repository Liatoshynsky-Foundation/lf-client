export type ArchiveCaseDocument = {
  order: number;
  text: string;
};

export type ArchiveAdjacentCase = {
  id: string;
  href: string;
  indexLabel: string;
  title: string;
};

export interface ArchiveCaseDetail {
  id: string;
  fund: string;
  caseSlug: string;

  title: string;
  code: string;
  dates: string;
  sheetsCount: number;

  documents: ArchiveCaseDocument[];
  pdfUrl: string;

  prev: ArchiveAdjacentCase | null;
  next: ArchiveAdjacentCase | null;
}
