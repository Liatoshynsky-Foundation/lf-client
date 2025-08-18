import { consentObj, parseDaConsent } from './consent';

describe('consentObj', () => {
  it('should return all consent fields as "granted" when granted is true', () => {
    expect(consentObj(true)).toEqual({
      ad_storage: 'granted',
      analytics_storage: 'granted',
      personalization_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  });

  it('should return all consent fields as "denied" when granted is false', () => {
    expect(consentObj(false)).toEqual({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'denied',
      security_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  });
});

describe('parseDaConsent', () => {
  it('should return a JS object string with unquoted keys', () => {
    const obj = {
      ad_storage: 'granted',
      analytics_storage: 'denied'
    };
    expect(parseDaConsent(obj)).toBe('{ad_storage:"granted",analytics_storage:"denied"}');
  });

  it('should work with empty objects', () => {
    expect(parseDaConsent({})).toBe('{}');
  });

  it('should handle keys with underscores and numbers', () => {
    const obj = {
      key_1: 'a',
      key2: 'b'
    };
    expect(parseDaConsent(obj)).toBe('{key_1:"a",key2:"b"}');
  });
});
