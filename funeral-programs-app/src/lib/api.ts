const API_BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export interface ApiProgram {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  nickname?: string;
  birthDate: string;
  deathDate: string;
  birthPlace?: string;
  deathPlace?: string;
  obituary?: string;
  parents?: string;
  spouse?: string;
  serviceName?: string;
  serviceDate?: string;
  serviceTime?: string;
  venue?: string;
  venueAddress?: string;
  templateId: string;
  customizations?: Record<string, any>;
  status: 'DRAFT' | 'COMPLETED' | 'EXPORTED';
  paid: boolean;
  children: Array<{ id: string; name: string; order: number }>;
  siblings: Array<{ id: string; name: string; order: number }>;
  events: Array<{ id: string; title: string; description?: string; order: number }>;
  photos: Array<{
    id: string;
    url: string;
    key: string;
    filename: string;
    isPrimary: boolean;
    order: number;
    uploadedAt: string;
  }>;
}

export interface CreateProgramData {
  firstName: string;
  lastName: string;
  middleName?: string;
  nickname?: string;
  birthDate: string;
  deathDate: string;
  birthPlace?: string;
  deathPlace?: string;
  obituary?: string;
  parents?: string;
  spouse?: string;
  serviceName?: string;
  serviceDate?: string;
  serviceTime?: string;
  venue?: string;
  venueAddress?: string;
  templateId?: string;
  children?: Array<{ name: string }>;
  siblings?: Array<{ name: string }>;
  events?: Array<{ title: string; description?: string }>;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async createProgram(data: CreateProgramData): Promise<ApiProgram> {
    return this.request('/programs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProgram(id: string): Promise<ApiProgram> {
    return this.request(`/programs/${id}`);
  }

  async updateProgram(id: string, data: Partial<CreateProgramData>): Promise<ApiProgram> {
    return this.request(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async listPrograms(): Promise<ApiProgram[]> {
    return this.request('/programs');
  }

  async deleteProgram(id: string): Promise<void> {
    await this.request(`/programs/${id}`, { method: 'DELETE' });
  }

  async uploadPhoto(programId: string, file: File): Promise<{
    id: string;
    url: string;
    key: string;
    filename: string;
    isPrimary: boolean;
    order: number;
    uploadedAt: string;
  }> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_BASE}/photos/programs/${programId}/photos`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  }

  async deletePhoto(photoId: string): Promise<void> {
    await this.request(`/photos/${photoId}`, { method: 'DELETE' });
  }

  async setPrimaryPhoto(photoId: string): Promise<{
    id: string;
    url: string;
    key: string;
    filename: string;
    isPrimary: boolean;
    order: number;
    uploadedAt: string;
  }> {
    return this.request(`/photos/${photoId}/primary`, { method: 'PATCH' });
  }
}

export const api = new ApiClient();