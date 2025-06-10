import { Box } from '@mui/material';
import React from 'react';

import PersonCard from '../design-system/all-components/person-card/PersonCard';
import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './FoundationTeam.styles';

interface Teammate {
  name: string;
  description: string;
  photo: string;
}

const team: Teammate[] = [
  {
    name: 'Тетяна Гомон',
    description:
      'Спадкоємиця композитора, співзасновниця і голова Фундації, піаністка-камералістка і музикознавиця, кандидатка мистецтвознавства',
    photo: '/images/foundation-team/tetyana-homon.png'
  },
  {
    name: 'Ірина Тукова',
    description: 'Співзасновниця Фундації, музикознавиця, лекторка і викладачка, докторка мистецтвознавства',
    photo: '/images/foundation-team/iryna-tykova.jpg'
  },
  {
    name: 'Марія Гурська',
    description: 'Менеджерка цифрових проєктів, курує розробку сайту, інформаційну структуру й редакційні процеси',
    photo: '/images/foundation-team/maria_hurska.jpg'
  },
  {
    name: 'Олександра Спасиченко',
    description: 'Альтистка ансамблю “Київські солісти” та струнного квартету «Black Tie»',
    photo: '/images/foundation-team/maria_hurska.jpg'
  },
  {
    name: 'Таїсія Білянська',
    description: 'Музикознавиця, викладачка, бакалавриня музичного мистецтва',
    photo: '/images/foundation-team/maria_hurska.jpg'
  }
];

const FoundationTeam = () => {
  return (
    <Box sx={styles.container}>
      {team.map((member, index) => (
        <React.Fragment key={member.name}>
          {index === 0 && (
            <Box sx={styles.logo}>
              <SvgImage src="/images/light-logo.svg" width={236} height={88} alt="logo" />
            </Box>
          )}
          <PersonCard name={member.name} description={member.description} imgURL={member.photo} />
          {(index + 1) % 2 === 0 && (
            <Box sx={styles.logo}>
              <SvgImage src="/images/light-logo.svg" width={236} height={88} alt="logo" />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default FoundationTeam;
