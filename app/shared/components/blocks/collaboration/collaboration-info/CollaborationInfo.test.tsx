// import { render, screen } from '@testing-library/react';

// import CollaborationInfo from './CollaborationInfo';

// jest.mock('next-intl', () => ({
//   useTranslations: () => (key: string) => key,
//   useLocale: () => 'en'
// }));

// jest.mock('~/i18n/navigation', () => ({
//   Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
// }));

// jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
//   __esModule: true,
//   Svg: () => <div data-testid="mock-svg" />
// }));

// jest.mock('./collaboration.const', () => ({
//   infoDoc: { en: 'info content' },
//   supportDoc: { en: 'support content' },
//   partnersDoc: { en: 'partners content' },
//   partnershipDoc: { en: 'partnership content' }
// }));

// describe('CollaborationInfo component', () => {
//   test('should render SectionTitle with translated title', () => {
//     render(<CollaborationInfo />);
//     expect(screen.getByText('title')).toBeInTheDocument();
//   });

//   test('should render ButtonContentBlock with correct localized content', () => {
//     render(<CollaborationInfo />);
//     expect(screen.getByText('info content')).toBeInTheDocument();
//     expect(screen.getByText('supportButton')).toBeInTheDocument();
//   });

//   test('should render all TitleContentBlock sections with correct content', () => {
//     render(<CollaborationInfo />);

//     expect(screen.getByText('supportTitle')).toBeInTheDocument();
//     expect(screen.getByText('support content')).toBeInTheDocument();

//     expect(screen.getByText('partnersTitle')).toBeInTheDocument();
//     expect(screen.getByText('partners content')).toBeInTheDocument();

//     expect(screen.getByText('partnershipTitle')).toBeInTheDocument();
//     expect(screen.getByText('partnership content')).toBeInTheDocument();
//   });
// });
