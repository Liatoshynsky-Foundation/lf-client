import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import EventItem from '~/shared/components/blocks/event-card/EventItem';
import { MOCK_EVENT_ITEMS } from '~/shared/components/blocks/event-card/EventItem.fixture';

const News = () => {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      {MOCK_EVENT_ITEMS.map(({ id, props }) => (
        <EventItem key={id} {...props} />
      ))}
    </MainLayout>
  );
};

export default News;
