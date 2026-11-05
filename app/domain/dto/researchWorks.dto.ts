import { TipTapDoc } from '~/types/types/tiptap.types';

export enum ResearchWorkStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type ResearchWorkPdfFile = {
  filename: string;
  url: string;
  mimeType: string;
};

export type ResearchWorkTableRow = {
  id: string;
  name: TipTapDoc;
  author: TipTapDoc;
  sortableYear: number;
  year: string;
  url: string | null;
  pdfFile: ResearchWorkPdfFile | null;
};
