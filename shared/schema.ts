import { pgTable, text, serial, integer, boolean, timestamp, decimal, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

export * from "./models/auth";

// === TABLE DEFINITIONS ===

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Price per night in cents/smallest unit or just plain number
  location: text("location").notNull(),
  type: text("type").notNull(), // 'hotel', 'apartment', 'villa', 'resort'
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  imageUrl: text("image_url").notNull(),
  features: text("features").array(), // WiFi, Pool, AC, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  userId: text("user_id").notNull(), // Matches auth.ts users.id (varchar)
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("confirmed"), // 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===

export const listingsRelations = relations(listings, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  listing: one(listings, {
    fields: [bookings.listingId],
    references: [listings.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertListingSchema = createInsertSchema(listings).omit({ id: true, createdAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===

export type Listing = typeof listings.$inferSelect;
export type InsertListing = z.infer<typeof insertListingSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Request types
export type CreateBookingRequest = InsertBooking;

// Response types
export type ListingResponse = Listing;
export type BookingResponse = Booking & { listing?: Listing };

// Query params
export interface SearchListingsParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}
