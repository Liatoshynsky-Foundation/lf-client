# Code Audit Implementation Guide

This guide provides a practical roadmap for implementing the recommendations from the Code Audit Report.

## Quick Reference Table

| Priority | Issue                            | Estimated Effort | Impact | Files Affected               |
| -------- | -------------------------------- | ---------------- | ------ | ---------------------------- |
| HIGH     | #1: Custom Renderer Duplication  | 4-6 hours        | High   | 7+ components                |
| HIGH     | #2: useState Mount Pattern       | 2-3 hours        | High   | 2 components                 |
| MEDIUM   | #3: Remove `any` Types           | 2-3 hours        | Medium | 5 files                      |
| MEDIUM   | #4: Extract Route Helpers        | 3-4 hours        | Medium | 2-3 API routes               |
| MEDIUM   | #5: Error Handling Pattern       | 4-5 hours        | Medium | All API routes               |
| LOW      | #6: TipTap Helper Consolidation  | 1-2 hours        | Low    | 1 file                       |
| HIGH     | #7: DI Container Singleton       | 1-2 hours        | High   | 1 file                       |
| MEDIUM   | #8: Repository Registration      | 1 hour           | Medium | 1 file                       |
| LOW      | #9: Magic Numbers                | 2-3 hours        | Low    | Multiple files               |
| MEDIUM   | #10: Export Pattern              | Ongoing          | Medium | All files                    |
| HIGH     | #11: useBreakpoints Loading      | 2-3 hours        | High   | 1 hook + affected components |
| LOW      | #12: Inline Styles               | 2-3 hours        | Low    | 12 instances                 |
| MEDIUM   | #13: JSDoc Comments              | 4-6 hours        | Medium | Complex components           |
| HIGH     | #14: Database Query Optimization | 4-6 hours        | High   | Repository layer             |
| MEDIUM   | #15: Table Abstraction           | 4-6 hours        | Medium | 2 table components           |

**Total Estimated Effort:** 42-57 hours (approximately 1-1.5 weeks for one developer)

## Phase 1: Critical Issues (Week 1)

### Day 1-2: DI Container and SSR Issues

#### Task 1.1: Fix DI Container Singleton (#7) - 1-2 hours

**File:** `app/di/container.ts`

**Current Code:**

```typescript
let container: AwilixContainer | null = null;

export function createRequestContainer() {
  container ??= createContainer().register({
    ...registerRepositories(),
    ...registerCoreServices(),
    ...registerComposedServices()
  });
  return container;
}
```

**New Code:**

```typescript
// Option 1: Create new container each time (recommended)
export function createRequestContainer() {
  return createContainer().register({
    ...registerRepositories(),
    ...registerCoreServices(),
    ...registerComposedServices()
  });
}

// Option 2: If performance is a concern, cache registrations
const registrations = Object.freeze({
  ...registerRepositories(),
  ...registerCoreServices(),
  ...registerComposedServices()
});

export function createRequestContainer() {
  return createContainer().register(registrations);
}
```

**Testing:**

- Verify no state leaks between API requests
- Test with multiple concurrent requests
- Check memory usage in production environment

#### Task 1.2: Fix useState Mount Pattern (#2) - 2-3 hours

**Files:** `NavigationBar.tsx`, `ControlPanel.tsx`

**For NavigationBar.tsx:**

```typescript
// Remove the isMounted pattern entirely
// Option 1: Use dynamic import
import dynamic from 'next/dynamic';

const DesktopNav = dynamic(() => import('./dekstop-nav/DesktopNav'), {
  ssr: false,
});

const MobileNav = dynamic(() => import('./mobile-nav/MobileNav'), {
  ssr: false,
});

const NavigationBar = ({ navLabels }: { navLabels: NavigationDTO[] }) => {
  const { isDesktop } = useBreakpoints();

  return isDesktop ? <DesktopNav navLabels={navLabels} /> : <MobileNav />;
};

// Option 2: Render both and hide with CSS
const NavigationBar = ({ navLabels }: { navLabels: NavigationDTO[] }) => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <DesktopNav navLabels={navLabels} />
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <MobileNav />
      </Box>
    </>
  );
};
```

**Testing:**

- Verify no hydration warnings in console
- Test responsive behavior
- Check performance with React DevTools Profiler

### Day 2-3: Eliminate Custom Renderer Duplication (#1) - 4-6 hours

#### Step 1: Create Factory Function

**New File:** `app/lib/utils/tiptapRendererFactory.ts`

```typescript
import { Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useMemo } from 'react';

export const createTypographyRenderer = (sx?: SxProps<Theme>) => {
  const Renderer = (children: React.ReactNode) => (
    <Typography sx={sx}>{children}</Typography>
  );
  Renderer.displayName = 'TypographyRenderer';
  return Renderer;
};

export const createBoxRenderer = (sx?: SxProps<Theme>, component: string = 'div') => {
  const Renderer = (children: React.ReactNode) => (
    <Box component={component} sx={sx}>
      {children}
    </Box>
  );
  Renderer.displayName = 'BoxRenderer';
  return Renderer;
};

// Hook version for memoization
export const useTipTapRenderers = (styles: Record<string, SxProps<Theme>>) => {
  return useMemo(() => ({
    paragraph: createTypographyRenderer(styles.paragraph),
    bold: createBoxRenderer(styles.bold, 'strong'),
    // Add more as needed
  }), [styles]);
};
```

#### Step 2: Update Components

**Files to update:**

- `FoundationInfo.tsx`
- `ContentBlock.tsx`
- `WhatWeDo.tsx`
- `OurGoals.tsx`
- `PolicyContent.tsx`
- `FoundationWasCreated.tsx`

**Example for FoundationInfo.tsx:**

```typescript
import { useTipTapRenderers, createTypographyRenderer } from '~/lib/utils/tiptapRendererFactory';

export default function FoundationInfo({ data }: { readonly data: IFoundationInfo }) {
  const { image, ourOrganisation, ourName, ourBelief } = data;

  const organisationParagraph = useMemo(
    () => createTypographyRenderer(styles.explanationText),
    []
  );

  const organisationBoldText = useMemo(
    () => createBoxRenderer(styles.organisationText, 'strong'),
    []
  );

  // Or use the hook for all renderers
  const renderers = useTipTapRenderers({
    explanationText: styles.explanationText,
    textSection: styles.textSection,
    textImage: styles.textImage,
  });

  return (
    <Box sx={styles.container}>
      {/* ... */}
      <TipTapContent
        data={ourOrganisation}
        markRenderers={{ bold: organisationBoldText }}
        nodeRenderers={{ paragraph: renderers.paragraph }}
      />
      {/* ... */}
    </Box>
  );
}
```

#### Step 3: Write Tests

**New File:** `app/lib/utils/tiptapRendererFactory.test.ts`

```typescript
import { render, screen } from '@testing-library/react';
import { createTypographyRenderer } from './tiptapRendererFactory';

describe('tiptapRendererFactory', () => {
  it('creates typography renderer with custom styles', () => {
    const Renderer = createTypographyRenderer({ color: 'red' });
    render(<Renderer>Test content</Renderer>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  // Add more tests
});
```

### Day 4: Enhanced useBreakpoints Hook (#11) - 2-3 hours

**File:** `app/shared/hooks/use-breakpoints/useBreakpoints.tsx`

```typescript
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';

const useBreakpoints = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    noSsr: true,
    defaultMatches: false // Prevents hydration mismatch
  });

  const isLaptopAndAbove = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
    defaultMatches: false
  });

  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'), {
    noSsr: true,
    defaultMatches: false
  });

  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'), {
    noSsr: true,
    defaultMatches: false
  });

  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'), {
    noSsr: true,
    defaultMatches: true // Mobile first
  });

  return {
    isDesktop,
    isLaptopAndAbove,
    isLaptop,
    isTablet,
    isMobile,
    isLoading: !mounted
  };
};

export default useBreakpoints;
```

**Update Tests:**

```typescript
// app/shared/hooks/use-breakpoints/useBreakpoints.test.tsx
describe('useBreakpoints', () => {
  it('returns isLoading true on initial render', () => {
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.isLoading).toBe(true);
  });

  it('returns isLoading false after mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBreakpoints());
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Phase 2: Important Issues (Week 2)

### Day 5-6: Type Safety Improvements

#### Task 2.1: Remove `any` Types (#3) - 2-3 hours

**File 1:** `app/api/compositions/data/route.ts`

```typescript
// Define proper types
interface CompositionFilters {
  genres?: string[];
  years?: {
    min: number;
    max: number;
  };
}

interface CompositionQueryParams {
  locale: string;
  search: string;
  genres: string[];
  yearFrom: string | null;
  yearTo: string | null;
}

export async function GET(req: NextRequest) {
  try {
    const params = parseQueryParams(req.nextUrl.searchParams);
    const filters = buildFilters(params);
    // ...
  } catch (error) {
    return handleApiError(error);
  }
}

function parseQueryParams(searchParams: URLSearchParams): CompositionQueryParams {
  return {
    locale: searchParams.get('locale') || 'uk',
    search: searchParams.get('search') || '',
    genres: searchParams.getAll('genre'),
    yearFrom: searchParams.get('yearFrom'),
    yearTo: searchParams.get('yearTo')
  };
}

function buildFilters(params: CompositionQueryParams): CompositionFilters | undefined {
  const filters: CompositionFilters = {};

  if (params.genres.length) {
    filters.genres = params.genres;
  }

  if (params.yearFrom || params.yearTo) {
    const min = params.yearFrom ? Number(params.yearFrom) : 1900;
    const max = params.yearTo ? Number(params.yearTo) : new Date().getFullYear();
    filters.years = { min, max };
  }

  return Object.keys(filters).length > 0 ? filters : undefined;
}
```

**File 2:** `app/shared/components/cookie-modal/CookieModalWrapper.tsx`

```typescript
interface GtagFunction {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', eventName: string, eventParams?: Record<string, unknown>): void;
  (command: 'set', config: Record<string, unknown>): void;
}

declare global {
  interface Window {
    gtag: GtagFunction;
  }
}
```

#### Task 2.2: Implement Error Handling (#5) - 4-5 hours

**New File:** `app/lib/utils/apiErrorHandler.ts`

```typescript
import { NextResponse } from 'next/server';
import { logger } from '~/middleware/logger/logger';

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Known API errors
  if (error instanceof ApiError) {
    logger.warn('API Error:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details
    });

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error.details && { details: error.details })
      },
      { status: error.statusCode }
    );
  }

  // Standard errors
  if (error instanceof Error) {
    logger.error('Unexpected Error:', {
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json({ error: 'An unexpected error occurred', code: 'INTERNAL_ERROR' }, { status: 500 });
  }

  // Unknown errors
  logger.error('Unknown Error:', error);
  return NextResponse.json({ error: 'Unknown error', code: 'UNKNOWN_ERROR' }, { status: 500 });
}
```

**Update all API routes to use this pattern**

### Day 7-8: Database and Service Layer

#### Task 2.3: Optimize Database Queries (#14) - 4-6 hours

**File:** `app/infrastructure/repositories/artistry/сompositions.repository.ts`

See detailed implementation in main audit document. Key changes:

- Use aggregation pipelines instead of multiple queries
- Add pagination support
- Optimize $lookup operations
- Add proper indexes in MongoDB

#### Task 2.4: Simplify Repository Registration (#8) - 1 hour

**File:** `app/di/modules/repositories.module.ts`

```typescript
import { asValue } from 'awilix';

export const registerRepositories = () => ({
  foundationInfoRepository: asValue(foundationInfoRepository),
  navigationRepository: asValue(navigationRepository),
  compositionsRepository: asValue(compositionsRepository),
  pagesDataRepository: asValue(pagesDataRepository),
  scientificWorksRepository: asValue(scientificWorksRepository)
});
```

## Testing Strategy

### Unit Tests

- All new utility functions
- Factory functions
- Error handlers
- Type validators

### Integration Tests

- API routes with new error handling
- Database queries with new optimizations
- Component rendering with new renderers

### E2E Tests

- Navigation with SSR improvements
- Responsive behavior
- Error scenarios

## Rollout Plan

1. **Deploy to staging**: Test all Phase 1 changes
2. **Monitor performance**: Check for regressions
3. **Gradual rollout**: Deploy Phase 1 to production
4. **Collect metrics**: Monitor error rates, performance
5. **Iterate**: Begin Phase 2 based on learnings

## Success Metrics

- Reduced code duplication: Target 5-7% (from ~10%)
- Type safety improvement: 0 `any` types in production code
- Performance: 20% faster API response times
- Developer experience: 30% faster onboarding for new developers
- Error visibility: 100% error tracking coverage

## Maintenance

After implementation:

1. Add linting rules to prevent regressions
2. Update documentation
3. Create coding guidelines document
4. Set up code review checklist
5. Schedule quarterly audits
