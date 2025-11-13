export type ArchiveCaseItem = {
  order: number;
  text: string;
};

export interface ArchiveCaseDetail {
  id: string;
  fund: string;
  caseSlug: string;
  title: string;
  code: string;
  dates: string;
  sheetsCount: number;
  items: ArchiveCaseItem[];
  pdfUrl?: string;

  prev?: { title: string; href: string } | null;
  next?: { title: string; href: string } | null;
}
