export enum PartnershipImageType {
  FirstRowImage = 'firstRowImage',
  SecondRowImage = 'secondRowImage'
}

export interface PartnershipCard {
  icon?: string;
  title: string;
  list: string[];
}

export interface PartnershipImage {
  src: string;
  alt: string;
  imageType: string;
}

export interface PartnershipFormatsProps {
  data: {
    title: string;
    firstRowFirstCard?: PartnershipCard;
    firstRowSecondCard?: PartnershipCard;
    firstRowImage?: PartnershipImage;
    secondRowImage?: PartnershipImage;
    secondRowFirstCard?: PartnershipCard;
    secondRowSecondCard?: PartnershipCard;
    descriptionText?: string;
    actionButtonText?: string;
    modalContent?: {
      formTitle?: string;
      formSubtitle?: string;
    };
  };
}
