import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { theme } from '../../design-system/all-components/theme/Theme';
import ImageWithCaption from '../../image-with-caption/ImageWithCaption';
import QuoteBlock from '../../Quote/Quote';
import { SvgImage } from '../../svg-image/SvgImage';
import { styles } from './AboutFoundation.styles';

const AboutFoundation = () => {
  const sectionStyles = styles(theme);

  return (
    <Box sx={sectionStyles.conatiner}>
      <Typography sx={sectionStyles.title}>ПРо ФундАціЮ</Typography>
      <Box sx={sectionStyles.photoContainer}>
        <Box sx={sectionStyles.yellowBlock} />
        <Box sx={sectionStyles.imageFirst}>
          <ImageWithCaption
            src="/images/foundation-main.png"
            alt="Тетяна Гомон та команда Фонду Лятошинського"
            caption="Тетяна Гомон та команда Фонду Лятошинського"
            sizes={{ height: { xs: 315 }, width: { xs: 800, sm: 900 } }}
            captionSx={sectionStyles.ImageCaption}
            containerSx={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
      <Box sx={sectionStyles.quote}>
        <QuoteBlock
          quoteText="Буде, звісно, дуже багато цікавого, але всього не почуєш, тому що в один вечір у різних театрах і залах проходитимуть по два концерти або опери."
          quoteIconColor="burgundy"
          mainTextColor="burgundy"
          alignRight={false}
          sourceText={{
            title: 'Лист Бориса Лятошинського Маргариті Царевич',
            data: '29 вересня 1957',
            place: 'Берлін'
          }}
        />
      </Box>
      <Box sx={sectionStyles.organisationSection}>
        <Typography sx={sectionStyles.explanationText}>
          <Box component="span" sx={sectionStyles.organisationText}>
            Фундація Лятошинського{' '}
          </Box>{' '}
          — це громадська організація, створена з метою зробити українську класичну музику ХХ–ХХІ століть впізнаваною у
          світі.
        </Typography>
      </Box>
      <Box sx={sectionStyles.bulletIcon}>
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={30} height={32} />
      </Box>
      <Box sx={sectionStyles.explanationSection}>
        <Typography sx={sectionStyles.textSection}>
          Ми названі на честь Бориса Лятошинського — одного з <b>найвпливовіших</b> композиторів в історії української
          музики, педагога, новатора, одного із засновників сучасної української композиторської школи.
        </Typography>
      </Box>
      <Box sx={sectionStyles.textImageSection}>
        <Typography sx={sectionStyles.textImage}>
          Ми знаємо, що українська академічна музика звучить гучно й гордо, на рівні з іншими європейськими та світовими
          культурами.
        </Typography>
        <Box sx={sectionStyles.bodyImage}>
          <Image src="/images/liatoshynsky-main-photo.png" alt="Борис Лятошинський" width={350} height={400} />
        </Box>
      </Box>
    </Box>
  );
};
export default AboutFoundation;
