import { defineCollection, z } from 'astro:content';

const capitulosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.string(),
    tiempoLectura: z.string(),
    categoria: z.string(),
    imagen: z.string(),
    destacado: z.boolean(),
  })
});

const ebooksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.number(),
    titulo: z.string(),
    subtitulo: z.string(),
    descripcion: z.string(),
    precio: z.number(),
    precioAnterior: z.number().optional(),
    imagen: z.string(),
    paginas: z.number(),
    categoria: z.string(),
    tipo: z.enum(['premium', 'gratuito']),
    valoracion: z.number(),
    descargas: z.number(),
    destacado: z.boolean(),
    contenido: z.array(z.string()),
  })
});

export const collections = {
  capitulos: capitulosCollection,
  ebooks: ebooksCollection,
};