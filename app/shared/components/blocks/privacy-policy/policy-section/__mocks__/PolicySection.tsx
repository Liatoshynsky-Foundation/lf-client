import type { PolicySectionProps } from '../PolicySection';

import { getDocKey } from '~/lib/utils/getDocKey';

export default function PolicySection({
  title,
  description,
  list,
  note,
  sections,
  dataTestId
}: Readonly<PolicySectionProps>) {
  return (
    <div data-testid={dataTestId}>
      {title && <h2 data-testid="mock-title">{typeof title === 'string' ? title : JSON.stringify(title)}</h2>}
      {description && <div data-testid="mock-description">{JSON.stringify(description)}</div>}
      {list && (
        <ul data-testid="mock-list">
          {list.map((item, idx) => (
            <li key={getDocKey(item) ?? `mock-list-${idx}`} data-testid={`mock-list-item-${idx}`}>
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
      {sections && (
        <div data-testid="mock-sections">
          {sections.map((section, idx) => {
            const sectionId = getDocKey(section.subtitle) ?? getDocKey(section.description) ?? `section-${idx}`;
            return (
              <div key={sectionId} data-testid={`mock-section-${sectionId}`}>
                {section.subtitle && <h3 data-testid="mock-section-subtitle">{JSON.stringify(section.subtitle)}</h3>}
                {section.description && (
                  <p data-testid="mock-section-description">{JSON.stringify(section.description)}</p>
                )}
                {section.list && (
                  <ul data-testid="mock-section-list">
                    {section.list.map((li, liIdx) => (
                      <li
                        key={getDocKey(li) ?? `mock-section-list-${idx}`}
                        data-testid={`mock-section-list-item-${liIdx}`}
                      >
                        {JSON.stringify(li)}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && <span data-testid="mock-section-note">{JSON.stringify(section.note)}</span>}
              </div>
            );
          })}
        </div>
      )}
      {note && <div data-testid="mock-note">{JSON.stringify(note)}</div>}
    </div>
  );
}
