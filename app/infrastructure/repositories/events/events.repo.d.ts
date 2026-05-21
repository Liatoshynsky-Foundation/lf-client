import { EventDTO, EventListItemDTO } from '~/domain/dto/events.dto';

export interface EventsRepository {
  getAllPublishedEvents(): Promise<EventListItemDTO[]>;
  getEventBySlug(slug: string): Promise<EventDTO | null>;
}
