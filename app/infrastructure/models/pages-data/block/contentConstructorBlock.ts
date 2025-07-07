import mongoose from 'mongoose';

import Block from './blockBase';
import baseElementSchema from './elements/baseElement';
import bulletedListElementSchema from './elements/bulletedListElement';
import headingElementSchema from './elements/headingElement';
import imageElementSchema from './elements/imageElement';
import paragraphElementSchema from './elements/paragraphElement';
import quoteElementSchema from './elements/quoteElement';

import titledListElementSchema from '~/infrastructure/models/pages-data/block/elements/titledListElement';

const contentConstructorBlockSchema = new mongoose.Schema({
  content: {
    elements: [baseElementSchema]
  }
});

const elementsArray = contentConstructorBlockSchema.path('content.elements') as mongoose.Schema.Types.DocumentArray;
elementsArray.discriminator('TitledList', titledListElementSchema);
elementsArray.discriminator('Heading', headingElementSchema);
elementsArray.discriminator('Paragraph', paragraphElementSchema);
elementsArray.discriminator('Image', imageElementSchema);
elementsArray.discriminator('Quote', quoteElementSchema);
elementsArray.discriminator('BulletedList', bulletedListElementSchema);

const ContentConstructorBlock = Block.discriminator('ContentConstructorBlock', contentConstructorBlockSchema);
export default ContentConstructorBlock;
