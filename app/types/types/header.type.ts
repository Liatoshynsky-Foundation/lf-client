import { NavigationDTO } from '~/domain/dto/navigation.dto';

export type SupportButtonData = {
  text: string;
  link: string;
};

export type HeaderData = {
  navigation: NavigationDTO[];
  supportButtonLink: string;
};
