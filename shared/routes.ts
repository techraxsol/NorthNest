import { z } from 'zod';
import { insertBookingSchema, listings, bookings } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  listings: {
    list: {
      method: 'GET' as const,
      path: '/api/listings',
      input: z.object({
        location: z.string().optional(),
        minPrice: z.string().optional(),
        maxPrice: z.string().optional(),
        type: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof listings.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/listings/:id',
      responses: {
        200: z.custom<typeof listings.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  bookings: {
    list: {
      method: 'GET' as const,
      path: '/api/bookings', // Returns current user's bookings
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect & { listing: typeof listings.$inferSelect }>()),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/bookings',
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type ListingResponse = z.infer<typeof api.listings.get.responses[200]>;
export type BookingInput = z.infer<typeof api.bookings.create.input>;
export type BookingResponse = z.infer<typeof api.bookings.create.responses[201]>;
