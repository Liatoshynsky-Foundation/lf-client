import { act, renderHook } from '@testing-library/react';

import { useContactForm } from './useContactForm';
import { ApiRoutes } from '~/constants/routes/api-routes';

import { ContactFormData } from '~/shared/components/forms/contact-form/ContactForm';

global.fetch = jest.fn();
const mockData = { id: 1, name: 'John Doe' };

describe('useContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return handleSubmit, isSubmitting = false, errorMessage = null by default', () => {
    const { result } = renderHook(() => useContactForm({}));

    expect(result.current).toStrictEqual({
      handleSubmit: expect.any(Function),
      isSubmitting: false,
      errorMessage: null
    });
  });

  it('should correctly propagate formType if provided', async () => {
    const formType = 'test form type';
    const { result } = renderHook(() => useContactForm({ formType }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {}
    });

    await act(async () => {
      await result.current.handleSubmit(mockData as unknown as ContactFormData);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      ApiRoutes.CONTACT,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: mockData, formType })
      })
    );
  });
  it('should call /api/contact & onSuccess with correct arguments, not return error msg and isSubmitting = false', async () => {
    const onSuccessMock = jest.fn();
    const { result } = renderHook(() => useContactForm({ onSuccess: onSuccessMock }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {}
    });

    await act(async () => {
      await result.current.handleSubmit(mockData as unknown as ContactFormData);
    });

    expect(result.current.errorMessage).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(onSuccessMock).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      ApiRoutes.CONTACT,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: mockData, formType: undefined })
      })
    );
  });
  it('should return errorMessage', async () => {
    const { result } = renderHook(() => useContactForm({}));
    const error = 'Забагато запитів. Спробуйте пізніше.';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error })
    });

    await act(async () => {
      try {
        await result.current.handleSubmit(mockData as unknown as ContactFormData);
      } catch (e) {
        expect((e as Error).message).toBe(error);
      }
    });

    expect(result.current.errorMessage).toBe(error);

    expect(result.current.isSubmitting).toBe(false);

    expect(global.fetch).toHaveBeenCalledWith(
      ApiRoutes.CONTACT,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: mockData, formType: undefined })
      })
    );
  });

  it.each([
    { status: 429, error: 'Забагато запитів. Спробуйте пізніше.' },
    { status: 400, error: 'Помилка відправки. Спробуйте ще раз.' }
  ])('should return "$error" for status $status', async ({ status, error }) => {
    const { result } = renderHook(() => useContactForm({}));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({ error })
    });

    await act(async () => {
      try {
        await result.current.handleSubmit(mockData as unknown as ContactFormData);
      } catch (e) {
        expect((e as Error).message).toBe(error);
      }
    });
  });

  it('should return "Сталася помилка з’єднання. Перевірте інтернет." error message when fetch fails', async () => {
    const { result } = renderHook(() => useContactForm({}));

    (global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Error'));

    await act(async () => {
      try {
        await result.current.handleSubmit(mockData as unknown as ContactFormData);
      } catch (e) {
        expect((e as Error).message).toBe('Error');
      }
    });

    expect(result.current.errorMessage).toBe('Сталася помилка з’єднання. Перевірте інтернет.');
  });
});
