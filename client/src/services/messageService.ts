import api from "./apiService";

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: "unread" | "read" | "replied" | "archived";
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const messageService = {
  /**
   * Submit a contact form message (public)
   */
  submitMessage: async (
    messageData: Omit<Message, "_id" | "isRead" | "createdAt" | "updatedAt">
  ): Promise<Message> => {
    try {
      const response = await api.post<{ data: Message }>(
        "/messages",
        messageData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting message:", error);
      throw error;
    }
  },

  /**
   * Get all messages with pagination (admin only)
   */
  getMessages: async (page = 1, limit = 10): Promise<MessagesResponse> => {
    try {
      // Define a proper interface for the API response structure
      interface MessageApiResponse {
        data: {
          data: Message[];
          pagination?: {
            total: number;
            page: number;
            limit: number;
            pages: number;
          };
        };
      }
      const response = await api.get<MessageApiResponse>(
        `/messages?page=${page}&limit=${limit}`
      );

      // Access the nested data structure correctly
      const messagesData = response.data.data || [];
      const pagination = response.data.pagination || {
        total: 0,
        page,
        limit,
        pages: 0,
      };

      return {
        messages: messagesData,
        total: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        pages: pagination.pages || 0,
      };
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  /**
   * Get a single message by ID (admin only)
   */
  getMessageById: async (id: string): Promise<Message> => {
    try {
      const response = await api.get<{ data: Message }>(`/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching message with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Mark a message as read (admin only)
   */
  markAsRead: async (id: string): Promise<Message> => {
    try {
      const response = await api.patch<{ data: Message }>(
        `/messages/${id}/read`,
        { isRead: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking message ${id} as read:`, error);
      throw error;
    }
  },

  /**
   * Delete a message (admin only)
   */
  deleteMessage: async (id: string): Promise<void> => {
    try {
      await api.delete(`/messages/${id}`);
    } catch (error) {
      console.error(`Error deleting message with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get count of unread messages (admin only)
   */
  getUnreadCount: async (): Promise<number> => {
    try {
      const response = await api.get<{ data: number }>(
        "/messages/unread/count"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching unread message count:", error);
      throw error;
    }
  },

  /**
   * Get recent messages (admin only)
   */
  getRecentMessages: async (limit = 5): Promise<Message[]> => {
    try {
      const response = await api.get<{ data: Message[] }>(
        `/messages/recent?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent messages:", error);
      throw error;
    }
  },
};

export default messageService;
