import { render, screen } from '@testing-library/react';

import { Language } from '~/types/types/language';

import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export const runCommonPageTests = (
  PageComponent: ({ params }: Readonly<Language>) => Promise<React.JSX.Element>,
  slug: string,
  lang: 'uk' | 'en' = 'uk'
) => {
  it('should correctly pass lang, slug & renderComponent to the PageBuilder', async () => {
    const ui = await PageComponent({
      params: Promise.resolve({
        lang
      })
    });

    render(ui);

    expect(PageBuilder).toHaveBeenCalledWith(
      expect.objectContaining({
        lang,
        slug,
        renderBlock: expect.any(Function)
      }),
      undefined
    );
    expect(screen.getByTestId('pagebuilder')).toBeInTheDocument();
    expect(screen.getByTestId('pagebuilder-lang')).toHaveTextContent(JSON.stringify(lang));
    expect(screen.getByTestId('pagebuilder-slug')).toHaveTextContent(JSON.stringify(slug));
  });
};
