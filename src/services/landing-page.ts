import { api, buildImageUrl } from '../utils/api';

// Tipos específicos para la landing page
interface HeroBlock {
  __component: 'blocks.hero';
  encabezado: string;
  frase: string;
  descripcion: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  imagen?: {
    url: string;
    alternativeText?: string;
  };
  tagEncabezado?: {
    nombre: string;
  };
  tagImagen?: {
    nombre: string;
  };
  tagsConfianza?: Array<{
    nombre: string;
  }>;
}

interface LandingPageData {
  blocks: Array<HeroBlock | any>; // any para otros tipos de bloques
}

interface ProcessedHeroData extends Omit<HeroBlock, 'imagen'> {
  imagen?: {
    url: string;
    alternativeText?: string;
  };
  imageURL: string; // URL completa procesada
}

export async function getLandingHero(): Promise<ProcessedHeroData> {
  try {
    const response = await api<LandingPageData>('/landing-page');
    
    const heroBlock = response.data?.blocks?.find(
      (block): block is HeroBlock => block.__component === 'blocks.hero'
    );

    if (!heroBlock) {
      throw new Error('Hero block not found in landing page');
    }

    // Procesamos la imagen URL usando el helper
    const imageURL = buildImageUrl(heroBlock.imagen?.url);

    return {
      ...heroBlock,
      imageURL,
    };
  } catch (error) {
    console.error('Error fetching landing hero:', error);
    throw new Error('Failed to fetch landing page hero data');
  }
}

// Función adicional para obtener todos los bloques de la landing
export async function getLandingBlocks(): Promise<Array<any>> {
  try {
    const response = await api<LandingPageData>('/landing-page');
    return response.data?.blocks || [];
  } catch (error) {
    console.error('Error fetching landing blocks:', error);
    throw new Error('Failed to fetch landing page blocks');
  }
}

// Función para obtener un bloque específico por tipo
export async function getLandingBlock<T = any>(componentType: string): Promise<T | null> {
  try {
    const blocks = await getLandingBlocks();
    return blocks.find((block) => block.__component === componentType) || null;
  } catch (error) {
    console.error(`Error fetching ${componentType} block:`, error);
    return null;
  }
}