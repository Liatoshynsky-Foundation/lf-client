export type DocumentRecord = {
  id: string;
  cipher: string;
  name: string;
  dates: string;
  sheets: number | null;
  contentDescription: string;
  pdfUrl?: string | null;
};
