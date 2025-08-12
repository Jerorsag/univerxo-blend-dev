// URL base de Strapi, configurable desde el .env
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

/**
 * Función genérica para llamar a la API de Strapi
 * @param endpoint Endpoint sin /api al inicio (ej: '/landing-page')
 */
export async function api<T>(endpoint: string): Promise<StrapiResponse<T>> {
  try {
    // Eliminamos barra final de STRAPI_URL si existe
    const baseUrl = STRAPI_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api${endpoint}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
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

/**
 * Construye una URL completa de imagen a partir de la URL que devuelve Strapi
 * Maneja rutas relativas y absolutas
 */
export function buildImageUrl(url: string) {
  if (!url) return '';

  // Si ya es absoluta, la devolvemos tal cual
  if (url.startsWith('http')) {
    return url;
  }

  // Si es relativa, la unimos con la base de Strapi
  return `${STRAPI_URL.replace(/\/$/, '')}${url}`;
}