export const filterGridHelper = (
  screenSize: {
    isLess350?: boolean;
    isLess420: boolean;
    isLess500?: boolean;
    isGreater550?: boolean;
    isGreater700?: boolean;
  },
  selected: { hasCategorySelected: boolean; hasGenreSelected: boolean }
) => {
  const { isLess350, isLess420, isLess500, isGreater550, isGreater700 } = screenSize;
  const isExtraSmall = !!isLess350;
  const { hasCategorySelected, hasGenreSelected } = selected;

  type Layout = {
    gridTemplateColumns: string;
    gridTemplateRows: string;
    containers: {
      category: { gridColumn: string; gridRow: string; width?: string };
      genre: { gridColumn: string; gridRow: string; width?: string };
      year: { gridColumn: string; gridRow: string; width?: string };
      clear: { gridColumn: string; gridRow: string; width?: string };
    };
  };

  const pickDefault = (extraSmall: Layout, mobile: Layout, mid: Layout, large: Layout) => {
    if (isExtraSmall) return extraSmall;
    if (isLess420) return mobile;
    if (isLess500) return mid;
    if (isGreater550) return large;
    return mid;
  };

  const bothExtraSmall: Layout = {
    gridTemplateColumns: '70px 50px 100px 30px',
    gridTemplateRows: 'auto auto auto',
    containers: {
      category: { gridColumn: '1 / 4', gridRow: '1', width: '250px' },
      genre: { gridColumn: '1 / 3', gridRow: '2', width: '220px' },
      year: { gridColumn: '1', gridRow: '3', width: '70px' },
      clear: { gridColumn: '2', gridRow: '3', width: '48px' }
    }
  };
  const genreOnlyExtraSmall: Layout = {
    gridTemplateColumns: '60px 60px 120px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1 / 2', gridRow: '2', width: '120px' },
      genre: { gridColumn: '1 / 3', gridRow: '1', width: '220px' },
      year: { gridColumn: '1', gridRow: '3', width: '80px' },
      clear: { gridColumn: '2', gridRow: '3', width: '48px' }
    }
  };
  const categoryOnlyExtraSmall: Layout = {
    gridTemplateColumns: '100px 70px 25px 25px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 4', gridRow: '1', width: '240px' },
      genre: { gridColumn: '1', gridRow: '2', width: '100px' },
      year: { gridColumn: '2', gridRow: '2', width: '70px' },
      clear: { gridColumn: '3', gridRow: '2', width: '48px' }
    }
  };
  const defaultExtraSmall: Layout = {
    gridTemplateColumns: '130px 70px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '130px' },
      genre: { gridColumn: '1', gridRow: '2', width: '100px' },
      year: { gridColumn: '2', gridRow: '1', width: '70px' },
      clear: { gridColumn: '2', gridRow: '1', width: '48px' }
    }
  };

  const bothMobile: Layout = {
    gridTemplateColumns: '220px 40px 70px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 2', gridRow: '2', width: '250px' },
      genre: { gridColumn: '1', gridRow: '1', width: '210px' },
      year: { gridColumn: '2 / 3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '2', gridRow: '2', width: '48px' }
    }
  };
  const bothMid: Layout = {
    gridTemplateColumns: '210px 40px 70px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 2', gridRow: '1', width: '250px' },
      genre: { gridColumn: '1', gridRow: '2', width: '210px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '2', gridRow: '2', width: '48px' }
    }
  };
  const bothLarge: Layout = {
    gridTemplateColumns: '210px 40px 70px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 2', gridRow: '1', width: '250px' },
      genre: { gridColumn: '1', gridRow: '2', width: '210px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '2', gridRow: '2', width: '48px' }
    }
  };
  const bothLarge700: Layout = {
    gridTemplateColumns: '250px 210px 70px 48px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '250px' },
      genre: { gridColumn: '2', gridRow: '1', width: '210px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '4', gridRow: '1', width: '48px' }
    }
  };

  if (hasCategorySelected && hasGenreSelected) {
    if (isGreater700) return bothLarge700;
    return pickDefault(bothExtraSmall, bothMobile, bothMid, bothLarge);
  }

  const genreOnlyMobile: Layout = {
    gridTemplateColumns: '110px 90px 50px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1 / span 2', gridRow: '2', width: '130px' },
      genre: { gridColumn: '1', gridRow: '1', width: '220px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '2 / span 3', gridRow: '2', width: '48px' }
    }
  };
  const categoryOnlyMobile: Layout = {
    gridTemplateColumns: '110px 55px 55px 70px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 4', gridRow: '1' },
      genre: { gridColumn: '1', gridRow: '2' },
      year: { gridColumn: '4', gridRow: '1' },
      clear: { gridColumn: '2', gridRow: '2' }
    }
  };

  const genreOnlyMid: Layout = {
    gridTemplateColumns: '70px 50px 70px 130px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '4', gridRow: '1', width: '130px' },
      genre: { gridColumn: '1 / 3', gridRow: '1', width: '220px' },
      year: { gridColumn: '1', gridRow: '2', width: '70px' },
      clear: { gridColumn: '2', gridRow: '2', width: '50px' }
    }
  };
  const categoryOnlyMid: Layout = {
    gridTemplateColumns: '60px 60px 60px 20px 100px',
    gridTemplateRows: 'auto auto',
    containers: {
      category: { gridColumn: '1 / 4', gridRow: '1', width: '250px' },
      genre: { gridColumn: '5', gridRow: '1', width: '100px' },
      year: { gridColumn: '1', gridRow: '2', width: '70px' },
      clear: { gridColumn: '2', gridRow: '2', width: '48px' }
    }
  };

  const genreOnlyLarge: Layout = {
    gridTemplateColumns: '220px 130px 50px 48px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '2', gridRow: '1', width: '130px' },
      genre: { gridColumn: '1', gridRow: '1', width: '220px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '4', gridRow: '1', width: '48px' }
    }
  };
  const categoryOnlyLarge: Layout = {
    gridTemplateColumns: '250px 100px 50px 48px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '250px' },
      genre: { gridColumn: '2', gridRow: '1', width: '100px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '4', gridRow: '1', width: '48px' }
    }
  };
  if (hasGenreSelected && !hasCategorySelected)
    return pickDefault(genreOnlyExtraSmall, genreOnlyMobile, genreOnlyMid, genreOnlyLarge);
  if (!hasGenreSelected && hasCategorySelected)
    return pickDefault(categoryOnlyExtraSmall, categoryOnlyMobile, categoryOnlyMid, categoryOnlyLarge);

  const defaultMobile: Layout = {
    gridTemplateColumns: '130px 100px',
    gridTemplateRows: 'auto auto auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '130px' },
      genre: { gridColumn: '2', gridRow: '1', width: '100px' },
      year: { gridColumn: '1', gridRow: '2', width: '70px' },
      clear: { gridColumn: '1', gridRow: '2', width: '48px' }
    }
  };
  const defaultMid: Layout = {
    gridTemplateColumns: '130px 100px 70px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '130px' },
      genre: { gridColumn: '2', gridRow: '1', width: '100px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '3', gridRow: '1', width: '48px' }
    }
  };
  const defaultLarge: Layout = {
    gridTemplateColumns: '130px 100px 70px',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridColumn: '1', gridRow: '1', width: '130px' },
      genre: { gridColumn: '2', gridRow: '1', width: '100px' },
      year: { gridColumn: '3', gridRow: '1', width: '70px' },
      clear: { gridColumn: '3', gridRow: '1', width: '48px' }
    }
  };

  return pickDefault(defaultExtraSmall, defaultMobile, defaultMid, defaultLarge);
};
