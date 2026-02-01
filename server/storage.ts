import { db } from "./db";
import {
  listings,
  bookings,
  users,
  type Listing,
  type InsertListing,
  type Booking,
  type InsertBooking,
} from "@shared/schema";
import { eq, and, gte, lte, ilike, or } from "drizzle-orm";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth/storage";

export interface IStorage extends IAuthStorage {
  // Listings
  getListings(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
  }): Promise<Listing[]>;
  getListing(id: number): Promise<Listing | undefined>;
  createListing(listing: InsertListing): Promise<Listing>;

  // Bookings
  getBookingsByUser(userId: string): Promise<(Booking & { listing: Listing | null })[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  // Auth methods delegated to authStorage
  getUser = authStorage.getUser;
  upsertUser = authStorage.upsertUser;

  // Listings
  async getListings(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
  }): Promise<Listing[]> {
    let query = db.select().from(listings);
    const conditions = [];

    if (filters?.location) {
      conditions.push(ilike(listings.location, `%${filters.location}%`));
    }
    if (filters?.minPrice) {
      conditions.push(gte(listings.price, filters.minPrice));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(listings.price, filters.maxPrice));
    }
    if (filters?.type) {
      conditions.push(eq(listings.type, filters.type));
    }

    if (conditions.length > 0) {
      return await query.where(and(...conditions));
    }

    return await query;
  }

  async getListing(id: number): Promise<Listing | undefined> {
    const [listing] = await db.select().from(listings).where(eq(listings.id, id));
    return listing;
  }

  async createListing(insertListing: InsertListing): Promise<Listing> {
    const [listing] = await db.insert(listings).values(insertListing).returning();
    return listing;
  }

  // Bookings
  async getBookingsByUser(userId: string): Promise<(Booking & { listing: Listing | null })[]> {
    const rows = await db
      .select({
        booking: bookings,
        listing: listings,
      })
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .leftJoin(listings, eq(bookings.listingId, listings.id));

    return rows.map((row) => ({
      ...row.booking,
      listing: row.listing,
    }));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }
}

export const storage = new DatabaseStorage();
