export const consentObj = (granted: boolean) => {
  const state = granted ? 'granted' : 'denied';
  return {
    ad_storage: state,
    analytics_storage: state,
    personalization_storage: state,
    functionality_storage: state,
    security_storage: state,
    ad_user_data: state,
    ad_personalization: state
  };
};

export function parseDaConsent(cookie: Record<string, string>): string {
  return JSON.stringify(cookie).replace(/"([^"]+)":/g, '$1:');
}
