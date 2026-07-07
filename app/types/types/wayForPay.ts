export type WayforPayInvoice = {
  merchantAccount: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: number;
  amount: number;
  currency: string;
  productName: string[];
  productCount: number[];
  productPrice: number[];
  language: 'UA' | 'EN';
  serviceUrl: string;
};
