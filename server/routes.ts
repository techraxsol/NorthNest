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
        title: "Serene Silk Route Lodge",
        description: "A beautiful lodge offering panoramic views of the Rakaposhi mountain. Experience authentic Gilgiti hospitality.",
        price: 80,
        location: "Hunza, Gilgit-Baltistan",
        type: "hotel",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bbaa",
        features: ["WiFi", "Mountain View", "Traditional Breakfast", "Parking"],
      },
      {
        title: "Attabad Lake Resort",
        description: "Wake up to the turquoise waters of Attabad Lake. Luxury wooden cabins with modern amenities.",
        price: 150,
        location: "Gojal, Hunza",
        type: "resort",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
        features: ["Boating", "Restaurant", "WiFi", "Heated Rooms"],
      },
      {
        title: "Skardu Heritage Villa",
        description: "Traditional Balti architecture meets modern comfort. Located near the Shangrila Resort area.",
        price: 120,
        location: "Skardu, Baltistan",
        type: "villa",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        features: ["Garden", "Fruit Orchards", "WiFi", "AC"],
      },
      {
        title: "Karakoram Guest House",
        description: "Budget-friendly stay for climbers and trekkers. Close to the main bazaar and trekking routes.",
        price: 40,
        location: "Gilgit City, GB",
        type: "hotel",
        rating: "4.5",
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        features: ["WiFi", "Tour Guide", "Kitchen Access", "Laundry"],
      },
      {
        title: "Fairy Meadows Eco-Hut",
        description: "Basic but cozy huts right in front of Nanga Parbat. The ultimate Himalayan experience.",
        price: 60,
        location: "Raikot, Diamer",
        type: "villa",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        features: ["Campfire", "Hiking", "Traditional Food", "Horse Riding"],
      }
    ];

    for (const listing of dummyListings) {
      await storage.createListing(listing);
    }
    console.log("Database seeded!");
  }
}
