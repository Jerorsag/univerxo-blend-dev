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

export const collections = {
  capitulos: capitulosCollection,
};