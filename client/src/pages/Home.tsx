import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Home, Hotel, Palmtree } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <main className="flex-1">
      {/* Hero Section */}
<div
  className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-bottom bg-fixed"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1628179487664-a1f95c267a26?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10"></div>

  <div className="relative z-10 px-4 md:px-0 max-w-3xl mx-auto mt-16 md:mt-24">
  <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
    Discover Northern Pakistan
  </h1>
  <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow-sm">
    Find unique stays in the Himalayas, Karakoram, Hunza, Skardu, and beyond.
  </p>
  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:-translate-y-1">
    Start Exploring
  </Button>
</div>

  <div className="absolute bottom-[-2.5rem] w-full px-4 md:px-0 z-20">
    <div className="max-w-6xl mx-auto shadow-xl rounded-lg overflow-hidden">
      <SearchWidget />
    </div>
  </div>
</div>

        {/* Content Section */}
        <div className="container-custom pt-24 pb-16 space-y-16">
          
          {/* Recent Promo */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden h-[200px] group cursor-pointer shadow-md">
              {/* scenic mountain landscape vacation */}
              <img 
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1000&auto=format&fit=crop" 
                alt="Offers" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 flex flex-col justify-center">
                <h3 className="text-white font-bold text-xl mb-2">Explore Hunza</h3>
                <p className="text-white/90 text-sm mb-4 max-w-[250px]">Save 15% or more when you book and stay before October 1, 2024</p>
                <Button className="w-fit bg-[#003580] hover:bg-[#00224f] text-white">Find a Deal</Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-[200px] group cursor-pointer shadow-md">
              {/* tropical beach resort vacation */}
              <img 
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop" 
                alt="Travel" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 flex flex-col justify-center">
                <h3 className="text-white font-bold text-xl mb-2">New year, new adventures</h3>
                <p className="text-white/90 text-sm mb-4 max-w-[250px]">Save 15% or more when you book and stay before January 1, 2025</p>
                <Button className="w-fit bg-[#003580] hover:bg-[#00224f] text-white">Find a Deal</Button>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Browse by property type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Hotels", icon: Hotel, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop" },
                { name: "Apartments", icon: Bed, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop" },
                { name: "Resorts", icon: Palmtree, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&auto=format&fit=crop" },
                { name: "Villas", icon: Home, img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=500&auto=format&fit=crop" },
              ].map((type) => (
                <Link key={type.name} href={`/search?type=${type.name.toLowerCase()}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-0 shadow-sm group">
                    <div className="h-40 overflow-hidden rounded-t-lg">
                      <img src={type.img} alt={type.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-500">12,345 properties</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Explore popular destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "New York", "Paris", "London", "Tokyo", "Dubai", "Rome"
              ].map((city) => (
                <Link key={city} href={`/search?location=${city}`}>
                  <div className="relative rounded-lg overflow-hidden aspect-square cursor-pointer group shadow-sm">
                    {/* dynamic placeholder logic for city images */}
                    <img 
                      src={`https://source.unsplash.com/featured/?${city},city`} 
                      // Fallback since source.unsplash is deprecated often, using reliable placeholders would be better but keeping simple
                      // Actually, let's use a reliable placeholder service or static logic if we had assets.
                      // Using a reliable generic city image for now to prevent broken images.
                      onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop"}
                      alt={city}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <span className="text-white font-bold">{city}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
