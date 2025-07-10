import { blockTransformers } from './blockTransformStrategy';

import {
  transformFoundationFounders,
  transformFoundationInfo,
  transformIntroSection,
  transformLiatoshynskyOffice,
  transformOurGoals,
  transformOurMission,
  transformWhatWeDo
} from '~/services/strategy/blockStrategy/homePage/transformer';
const compareStrings = (a: string, b: string) => a.localeCompare(b);

describe('blockTransformers', () => {
  test('should map component names to the correct transformer functions', () => {
    expect(blockTransformers.IntroSection).toBe(transformIntroSection);
    expect(blockTransformers.FoundationInfo).toBe(transformFoundationInfo);
    expect(blockTransformers.OurMission).toBe(transformOurMission);
    expect(blockTransformers.OurGoals).toBe(transformOurGoals);
    expect(blockTransformers.LiatoshynskyOffice).toBe(transformLiatoshynskyOffice);
    expect(blockTransformers.WhatWeDo).toBe(transformWhatWeDo);
    expect(blockTransformers.FoundationFounders).toBe(transformFoundationFounders);
  });

  test('should contain exactly the expected set of component names', () => {
    const expectedKeys = [
      'IntroSection',
      'FoundationInfo',
      'OurMission',
      'OurGoals',
      'LiatoshynskyOffice',
      'WhatWeDo',
      'FoundationFounders'
    ];

    const actualKeys = Object.keys(blockTransformers);
    expect(actualKeys.sort(compareStrings)).toEqual(expectedKeys.sort(compareStrings));
    expect(actualKeys.length).toBe(expectedKeys.length);
  });
});
