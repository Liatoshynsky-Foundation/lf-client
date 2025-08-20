import { baseService } from '~/services/client/baseService';

export const tableClientService = {
  async getTableData<T>(endpoint: string): Promise<T[]> {
    return baseService.request<T[]>({
      method: 'GET',
      url: endpoint
    });
  }
};
