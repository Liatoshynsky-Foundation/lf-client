import { EventDTO, EventListItemDTO } from '~/domain/dto/event.dto';

export interface EventRepository {
  getAllPublishedEvents(): Promise<EventListItemDTO[]>;
  getEventBySlug(slug: string): Promise<EventDTO | null>;
}
