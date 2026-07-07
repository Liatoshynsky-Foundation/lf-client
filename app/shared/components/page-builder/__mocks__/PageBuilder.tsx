import React from 'react';

const PageBuilder = jest.fn(({ lang, slug }: any) => (
  <div data-testid="pagebuilder">
    <div data-testid="pagebuilder-lang">{JSON.stringify(lang)}</div>
    <div data-testid="pagebuilder-slug">{JSON.stringify(slug)}</div>
  </div>
));

export default PageBuilder;
