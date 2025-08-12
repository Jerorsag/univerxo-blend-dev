// src/utils/api.ts
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

// Función genérica para llamadas a la API
export async function api<T>(endpoint: string): Promise<StrapiResponse<T>> {
  try {
    const url = `${STRAPI_URL}/api${endpoint}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: StrapiError = await response.json();
      throw new Error(`Strapi API Error: ${errorData.error.message}`);
    }

    const data: StrapiResponse<T> = await response.json();
    console.log('Data fetched successfully from:', endpoint);
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Función helper para construir URLs completas de imágenes
export function buildImageUrl(imageUrl?: string): string {
  return imageUrl ? `${STRAPI_URL}${imageUrl}` : '';
}