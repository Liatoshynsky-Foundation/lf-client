import { actionsHelpPageData, getActionsHelpData } from './ActionsHelp.consts';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

jest.mock('~/lib/utils/navigationHelper', () => ({
  getNavigationLink: jest.fn()
}));

describe('ActionsHelp constants', () => {
  const mockLink = '/cooperation-link';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data with correct navigation link on success', async () => {
    (getNavigationLink as jest.Mock).mockResolvedValue(mockLink);

    const data = await getActionsHelpData();

    expect(data.paperButton.link).toBe(mockLink);
    expect(data.title).toBe(actionsHelpPageData.title);
    expect(getNavigationLink).toHaveBeenCalledWith('/cooperation', 'cooperation');
  });

  it('should fallback to "/" and log warning if getNavigationLink fails', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    (getNavigationLink as jest.Mock).mockRejectedValue(new Error('Link error'));

    const data = await getActionsHelpData();

    expect(data.paperButton.link).toBe('/');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
