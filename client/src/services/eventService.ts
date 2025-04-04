import api from './apiService';

export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  theme?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  registrationRequired?: boolean;
}

export interface EventsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Event[];
  message?: string;
  error?: any;
}

// Define the type for axios response
interface ApiResponse<T> {
  data: T;
}

const eventService = {
  /**
   * Get all events with optional pagination
   */
  getEvents: async (page = 1, limit = 10): Promise<EventsResponse> => {
    try {
      const response = await api.get<EventsResponse>(`/events?page=${page}&limit=${limit}`);
      return response; // Directly return the response, as it's already of type EventsResponse
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  /**
   * Get a single event by ID
   */
  getEventById: async (id: string): Promise<Event> => {
    try {
      // Validate ID format before making the request
      if (!id || id.length !== 24) {
        throw new Error('Invalid event ID format');
      }

      const response = await api.get<{ data: Event }>(`/events/${id}`);
      return response.data; // Access the 'data' property within the response
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new event (admin only)
   */
  createEvent: async (eventData: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    try {
      const response = await api.post<Event>('/events', eventData);
      return response; // Directly return the response, as it's already of type Event
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  /**
   * Update an event (admin only)
   */
  updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event> => {
    try {
      const response = await api.put<Event>(`/events/${id}`, eventData);
      return response; // Directly return the response, as it's already of type Event
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an event (admin only)
   */
  deleteEvent: async (id: string): Promise<void> => {
    try {
      await api.delete(`/events/${id}`);
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get upcoming events
   */
  getUpcomingEvents: async (limit = 5): Promise<Event[]> => {
    try {
      const response = await api.get<Event[]>(`/events/upcoming?limit=${limit}`);
      return response; // Directly return the response, as it's already of type Event[]
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  },

  /**
   * Get events for a specific date range (for calendar)
   */
  getEventsByDateRange: async (startDate: string, endDate: string): Promise<Event[]> => {
    try {
      const response = await api.get<Event[]>(`/events/range?startDate=${startDate}&endDate=${endDate}`);
      return response; // Directly return the response, as it's already of type Event[]
    } catch (error) {
      console.error('Error fetching events by date range:', error);
      throw error;
    }
  }
};

export default eventService;
