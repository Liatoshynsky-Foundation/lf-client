import { EventDTO, EventListItemDTO } from '~/domain/dto/events.dto';

export interface EventRepository {
  getAllPublishedEvents(): Promise<EventListItemDTO[]>;
  getEventBySlug(slug: string): Promise<EventDTO | null>;
}
