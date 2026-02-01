import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#003580] text-white pt-12 pb-6 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">NorthNest</h3>
            <p className="text-sm text-blue-100/80">
              Your trusted partner for finding the perfect stay anywhere in the world.
              From cozy apartments to luxury resorts.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-blue-100/80">
              <li><a href="#" className="hover:text-white hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Careers</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Press</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-blue-100/80">
              <li><a href="#" className="hover:text-white hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Safety Information</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Report Issue</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Discover</h4>
            <ul className="space-y-2 text-sm text-blue-100/80">
              <li><Link href="/search?type=hotel" className="hover:text-white hover:underline">Hotels</Link></li>
              <li><Link href="/search?type=apartment" className="hover:text-white hover:underline">Apartments</Link></li>
              <li><Link href="/search?type=resort" className="hover:text-white hover:underline">Resorts</Link></li>
              <li><Link href="/search?type=villa" className="hover:text-white hover:underline">Villas</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-blue-100/60">
          <p>© {new Date().getFullYear()} NorthNest. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
