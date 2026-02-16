import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
              About NorthNest
            </h1>
            <p className="mt-3 text-gray-700 max-w-3xl">
              NorthNest is a discovery and booking platform built for Northern Pakistan — helping
              travelers find authentic stays in mountain regions like Hunza, Skardu, Swat, and Fairy Meadows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Local-first</h3>
                <p className="text-sm text-gray-600">
                  We focus on verified local guesthouses, lodges, cottages, and homestays.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Built for explorers</h3>
                <p className="text-sm text-gray-600">
                  Designed for hikers, families, road-trippers, and adventure travelers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Simple booking</h3>
                <p className="text-sm text-gray-600">
                  Search by region, filter by amenities, compare stays, and book with confidence.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">Our mission</h2>
              <p className="text-gray-700">
                Make mountain travel easier — by connecting guests with trusted stays and helping
                local hosts reach the right travelers.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
