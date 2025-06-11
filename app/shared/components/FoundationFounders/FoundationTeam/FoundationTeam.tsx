import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/FoundationFounders/FoundationTeam/FoundationTeam.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';
import PersonCard from '~/ds-components/person-card/PersonCard';

interface FoundationTeamProps {
  title: string;
}

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
    photo: '/images/foundation-team/Tetyana-Homon.png'
  },
  {
    name: 'Ірина Тукова',
    description: 'Співзасновниця Фундації, музикознавиця, лекторка і викладачка, докторка мистецтвознавства',
    photo: '/images/foundation-team/Iryna-Tykova.png'
  },
  {
    name: 'Марія Гурська',
    description: 'Менеджерка цифрових проєктів, курує розробку сайту, інформаційну структуру й редакційні процеси',
    photo: '/images/foundation-team/Taisia-Bilyanska.png'
  },
  {
    name: 'Олександра Спасиченко',
    description: 'Альтистка ансамблю “Київські солісти” та струнного квартету «Black Tie»',
    photo: '/images/foundation-team/Taisia-Bilyanska.png'
  },
  {
    name: 'Таїсія Білянська',
    description: 'Музикознавиця, викладачка, бакалавриня музичного мистецтва',
    photo: '/images/foundation-team/Taisia-Bilyanska.png'
  }
];

const FoundationTeam: React.FC<FoundationTeamProps> = ({ title }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>{title}</Typography>
      </Box>
      <Box sx={styles.foundationTeam}>
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
    </Box>
  );
};

export default FoundationTeam;
