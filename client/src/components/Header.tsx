import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  User, 
  LogOut, 
  Globe, 
  Menu,
  BedDouble
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#003580] text-white shadow-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-1.5 rounded-sm group-hover:bg-[#FEBB02] transition-colors duration-300">
              <BedDouble className="h-6 w-6 text-[#003580]" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">NorthNest</span>
          </Link>
           {/* Nav (Desktop) */}
  <div className="flex items-center gap-6">

  {/* Nav (Desktop) */}
  <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
    <Link href="/about">
      <span className="cursor-pointer hover:text-white transition-colors">About</span>
    </Link>
    <Link href="/help">
      <span className="cursor-pointer hover:text-white transition-colors">Help</span>
    </Link>
    <Link href="/contact">
      <span className="cursor-pointer hover:text-white transition-colors">Contact</span>
    </Link>
  </nav>
  </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:bg-white/10 hover:text-white gap-1">
              <span className="font-medium">USD</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:bg-white/10 hover:text-white gap-1">
              <Globe className="h-4 w-4" />
              <span className="font-medium">EN</span>
            </Button>

            <Link href="/search">
              <Button variant="outline" size="sm" className="hidden sm:flex border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                List your property
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full border border-white/20 hover:bg-white/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.firstName || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/bookings" className="w-full cursor-pointer">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/api/login'}
                  className="text-white hover:bg-white/10 hover:text-white font-semibold"
                >
                  Register
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-white text-[#003580] hover:bg-gray-100 hover:text-[#003580] font-semibold"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
