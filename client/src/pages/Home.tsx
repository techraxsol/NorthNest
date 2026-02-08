import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Home, Hotel, Palmtree } from "lucide-react";
const destinations = [
  {
    name: "Hunza Valley",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Skardu",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Fairy Meadows",
    image:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1400&q=80",
  },
 {
  name: "Swat Valley",
  image:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
},
];
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <main className="flex-1">
      {/* Hero Section */}
<div
  className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center text-center text-white bg-cover bg-bottom bg-fixed"
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
        <div className="container-custom pt-20 pb-16 space-y-20">
          
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
          {/* Featured Regions */}
<div>
  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
    Explore Northern Pakistan
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        name: "Hunza Valley",
        region: "hunza",
        img: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&auto=format&fit=crop",
      },
      {
        name: "Skardu",
        region: "skardu",
        img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop",
      },
      {
        name: "Swat Valley",
        region: "swat",
        img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop",
      },
      {
        name: "Fairy Meadows",
        region: "fairy-meadows",
        img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&auto=format&fit=crop",
      },
    ].map((place) => (
      <Link key={place.region} href={`/search?region=${place.region}`}>
        <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group shadow-md">
          <img
            src={place.img}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <h3 className="text-white text-xl font-semibold">
              {place.name}
            </h3>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
{/* Why Choose Us */}
<div className="bg-white rounded-2xl p-8 shadow-sm">
  <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display text-center">
    Why book with NorthNest?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="flex items-start gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Home className="text-green-700" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">
          Verified local stays
        </h3>
        <p className="text-gray-600 text-sm">
          Handpicked guesthouses, lodges, and homes across Northern Pakistan.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="bg-blue-100 p-3 rounded-full">
        <Bed className="text-blue-700" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">
          Comfort in the mountains
        </h3>
        <p className="text-gray-600 text-sm">
          Warm, clean, and comfortable stays — even in remote regions.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="bg-yellow-100 p-3 rounded-full">
        <Hotel className="text-yellow-700" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">
          Built for explorers
        </h3>
        <p className="text-gray-600 text-sm">
          Designed for hikers, trekkers, families, and adventure travelers.
        </p>
      </div>
    </div>
  </div>
</div>
          {/* Property Types */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Browse by property type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
  {
    name: "Guest Houses",
    img: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=500&auto=format&fit=crop",
  },
  {
    name: "Mountain Lodges",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop",
  },
  {
    name: "Cottages",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop",
  },
  {
    name: "Homestays",
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop",
  },
].map((type) => (
                <Link key={type.name} href={`/search?type=${type.name.toLowerCase().replace(" ", "-")}`}>
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
          <section className="max-w-7xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold text-gray-900 mb-2">
    Explore Popular Destinations
  </h2>
  <p className="text-gray-600 mb-8">
    Discover Pakistan’s most loved mountain escapes
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {destinations.map((place) => (
      <div
        key={place.name}
        className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
      >
        <img
          src={place.image}
          alt={place.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-semibold">
            {place.name}
          </h3>
        </div>
      </div>
    ))}
  </div>
</section>

        </div>
      </main>
      {/* Call to Action */}
<div className="bg-[#0F2A1D] rounded-2xl p-10 text-center text-white">
  <h2 className="text-3xl font-bold mb-4 font-display text-white">
    Start your journey into Northern Pakistan
  </h2>
  <p className="text-white/90 max-w-2xl mx-auto mb-6">
    Discover authentic mountain stays, breathtaking views, and unforgettable experiences.
  </p>
  <Link href="/search">
    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg shadow-lg">
      Explore stays
    </Button>
  </Link>
</div>

      <Footer />
    </div>
  );
}
