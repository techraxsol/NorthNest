import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth FIRST
  await setupAuth(app);
  registerAuthRoutes(app);

  // === Listings Routes ===

  app.get(api.listings.list.path, async (req, res) => {
    try {
      const filters = {
        location: req.query.location as string | undefined,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        type: req.query.type as string | undefined,
      };

      const listings = await storage.getListings(filters);
      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });

  app.get(api.listings.get.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ message: "Listing not found" });
      }

      const listing = await storage.getListing(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      res.json(listing);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch listing" });
    }
  });

  // === Bookings Routes ===

  app.get(api.bookings.list.path, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post(api.bookings.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.bookings.create.input.parse({
        ...req.body,
        userId: req.user.claims.sub, // Ensure userId comes from auth
      });

      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingListings = await storage.getListings();
  if (existingListings.length === 0) {
    console.log("Seeding database...");
    const dummyListings = [
      {
        title: "Luxury Apartment in Downtown",
        description: "Experience the city life in this modern apartment with stunning views. Close to all major attractions and transport.",
        price: 150,
        location: "New York, USA",
        type: "apartment",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        features: ["WiFi", "AC", "Kitchen", "Gym"],
      },
      {
        title: "Cozy Mountain Cabin",
        description: "Escape to nature in this beautiful wooden cabin. Perfect for hiking and relaxing by the fireplace.",
        price: 200,
        location: "Aspen, USA",
        type: "villa",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        features: ["Fireplace", "Hiking", "Parking", "Pet Friendly"],
      },
      {
        title: "Seaside Resort & Spa",
        description: "Relax by the beach in our premium resort. Includes access to private beach, spa, and 3 restaurants.",
        price: 350,
        location: "Maldives",
        type: "resort",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
        features: ["Beach Access", "Spa", "Breakfast Included", "Pool"],
      },
      {
        title: "Modern Hotel Room",
        description: "Comfortable and spacious room in the heart of the business district. Ideal for business travelers.",
        price: 120,
        location: "London, UK",
        type: "hotel",
        rating: "4.5",
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
        features: ["WiFi", "Desk", "Room Service", "Bar"],
      },
      {
        title: "Historic Villa in Tuscany",
        description: "Stay in a renovated 18th-century villa surrounded by vineyards and olive groves.",
        price: 500,
        location: "Tuscany, Italy",
        type: "villa",
        rating: "5.0",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        features: ["Pool", "Garden", "Wine Tasting", "Chef"],
      },
       {
        title: "Urban Loft",
        description: "Stylish loft in a trendy neighborhood. Walking distance to cafes, galleries, and shops.",
        price: 180,
        location: "Berlin, Germany",
        type: "apartment",
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        features: ["WiFi", "Balcony", "Coffee Machine", "Smart TV"],
      }
    ];

    for (const listing of dummyListings) {
      await storage.createListing(listing);
    }
    console.log("Database seeded!");
  }
}
