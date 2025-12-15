import { DocumentRecord } from '~/types/types/document.types';

export const mockDocuments: DocumentRecord[] = [
  {
    id: '1',
    cipher: 'Ф. 2, оп. 1, спр. 1',
    name: 'Документи про народження і освіту',
    dates: '1895–1955',
    sheets: 11,
    contentDescription: 'Метричні виписки, свідоцтва, студентські квитки, довідки з університету',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '2',
    cipher: 'Ф. 2, оп. 1, спр. 2',
    name: 'Похвальні листи гімназій',
    dates: '1895–1955',
    sheets: 5,
    contentDescription: 'Похвальні листи Першої Київської, Немирівської, Златопільської гімназій',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '3',
    cipher: 'Ф. 2, оп. 1, спр. 3',
    name: 'Трудова діяльність',
    dates: '1895–1955',
    sheets: 26,
    contentDescription:
      'Витяги з наказів, протоколи, довідки про роботу, посвідчення працівника, атестат професора, пенсійне посвідчення',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '4',
    cipher: 'Ф. 2, оп. 1, спр. 4',
    name: 'Нагороди та звання',
    dates: '1895–1955',
    sheets: 14,
    contentDescription: 'Орденські книжки, дипломи про присвоєння звань, посвідчення про нагороди, подяки',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '5',
    cipher: 'Ф. 2, оп. 1, спр. 5',
    name: 'Автобіографії та довідки',
    dates: '1895–1955',
    sheets: 8,
    contentDescription: 'Автобіографії та довідки',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '6',
    cipher: 'Ф. 2, оп. 1, спр. 6',
    name: 'Членство в організаціях',
    dates: '1895–1955',
    sheets: 4,
    contentDescription: 'Членські квитки',
    pdfUrl: null
  },
  {
    id: '7',
    cipher: 'Ф. 2, оп. 1, спр. 7',
    name: 'Поїздки за кордон',
    dates: '1959–1966',
    sheets: 4,
    contentDescription: 'Довідки, рекомендації, запрошення, документи про перебування за кордоном',
    pdfUrl: '/files/example.pdf'
  },
  {
    id: '8',
    cipher: 'Ф. 2, оп. 1, спр. 8',
    name: 'Військова служба',
    dates: '1915–1946',
    sheets: null,
    contentDescription: 'Військовий квиток, довідки про мобілізацію / відстрочку',
    pdfUrl: null
  },
  {
    id: '9',
    cipher: 'Ф. 2, оп. 1, спр. 9',
    name: 'Різне',
    dates: '1955',
    sheets: null,
    contentDescription: 'Різне',
    pdfUrl: null
  },
  {
    id: '10',
    cipher: 'Ф. 2, оп. 2, спр. 1',
    name: 'Листи-привітання з 50-річчям',
    dates: '1945',
    sheets: 9,
    contentDescription: 'Листи-привітання',
    pdfUrl: '/files/example.pdf'
  }
];
