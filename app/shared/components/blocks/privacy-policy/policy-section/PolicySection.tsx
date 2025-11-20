import Box from '@mui/material/Box';

import ListItem from '~/components/list-item/ListItem';
import SectionTitle from '~/components/section-title/SectionTitle';

import { PolicyContent } from '../policy-content/PolicyContent';
import { styles } from './PolicySection.styles';
import type { TipTapDoc } from '~/types/types/tiptap.types';

import { getDocKey } from '~/lib/utils/getDocKey';
import { theme } from '~/shared/components/design-system/all-components/theme/Theme';

export type SectionItem = {
  subtitle?: TipTapDoc;
  description?: TipTapDoc;
  list?: TipTapDoc[];
  note?: TipTapDoc;
};

type PolicySectionProps = {
  title?: string;
  description?: TipTapDoc;
  list?: TipTapDoc[];
  note?: TipTapDoc;
  sections?: SectionItem[];
  sx?: object;
  contentGridColumn?: { xs: string; sm: string; md: string } & Record<string, string>;
  listGridColumn?: { xs: string; sm: string; md: string } & Record<string, string>;
  dataTestId?: string;
};

export default function PolicySection({
  title,
  description,
  list,
  note,
  sections,
  sx,
  contentGridColumn = { xs: '2 / 5', sm: '4 / 9', md: '6 / 13' },
  listGridColumn = { xs: '2 / 5', sm: '4 / 9', md: '6 / 13' },
  dataTestId
}: Readonly<PolicySectionProps>) {
  const hasList = Array.isArray(list) && list.length > 0;
  const hasSections = Array.isArray(sections) && sections.length > 0;

  return (
    <Box sx={{ ...styles(theme).root, ...sx }} data-testid={dataTestId}>
      {title && <SectionTitle title={title} mb={16} />}

      {description && (
        <PolicyContent
          doc={description}
          paragraphSx={{ ...styles(theme).description, gridColumn: contentGridColumn }}
        />
      )}

      {hasList && (
        <Box
          sx={{
            ...styles(theme).listWrapper,
            gridColumn: listGridColumn,
            mb: {
              xs: note ? '40px' : 0,
              sm: note ? '40px' : 0,
              lg: note ? '64px' : 0
            }
          }}
        >
          {list?.map((item, idx) => (
            <ListItem
              key={`list-${idx}-${getDocKey(item) ?? 'item'}`}
              text={<PolicyContent doc={item} paragraphSx={{ ...styles(theme).paragraph }} />}
              sx={{ maxWidth: 'none', width: '100%' }}
            />
          ))}
        </Box>
      )}

      {hasSections &&
        sections?.map((section, idx) => {
          const sectionHasList = Array.isArray(section.list) && section.list.length > 0;
          const sectionKey = getDocKey(section.subtitle) ?? getDocKey(section.description) ?? `section-${idx}`;

          return (
            <Box
              key={sectionKey}
              sx={{
                ...styles(theme).sectionWrapper,
                mt: idx === 0 ? { xs: '40px', sm: '40px', md: '64px' } : 0,
                mb: idx === sections.length - 1 && !note ? 0 : { xs: '40px', sm: '40px', md: '64px' }
              }}
            >
              {section.subtitle && (
                <PolicyContent
                  doc={section.subtitle}
                  paragraphSx={{ ...styles(theme).subtitle, gridColumn: contentGridColumn }}
                />
              )}
              {section.description && (
                <PolicyContent
                  doc={section.description}
                  paragraphSx={{ ...styles(theme).description, gridColumn: contentGridColumn }}
                />
              )}

              {sectionHasList && (
                <Box
                  sx={{
                    ...styles(theme).sectionListWrapper,
                    gridColumn: listGridColumn,
                    mb: section.note ? '32px' : 0
                  }}
                >
                  {section.list?.map((li, liIdx) => (
                    <ListItem
                      key={`section-${idx}-li-${liIdx}-${getDocKey(li) ?? 'item'}`}
                      text={<PolicyContent doc={li} paragraphSx={{ ...styles(theme).paragraph }} />}
                      sx={{ maxWidth: 'none', width: '100%' }}
                    />
                  ))}
                </Box>
              )}

              {section.note && (
                <PolicyContent
                  doc={section.note}
                  paragraphSx={{ ...styles(theme).paragraph, gridColumn: contentGridColumn }}
                />
              )}
            </Box>
          );
        })}

      {note && <PolicyContent doc={note} paragraphSx={{ ...styles(theme).paragraph, gridColumn: contentGridColumn }} />}
    </Box>
  );
}
