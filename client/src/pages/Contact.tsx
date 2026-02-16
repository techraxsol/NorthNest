import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
              Contact
            </h1>
            <p className="mt-3 text-gray-700 max-w-3xl">
              Send us a message. This form is UI-ready and can be wired to an API/email service in the next sprint.
            </p>
          </div>

          <Card className="border-0 shadow-sm max-w-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input placeholder="Your name" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input placeholder="you@email.com" type="email" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <Textarea placeholder="How can we help?" className="min-h-[140px]" />
              </div>

              <div className="flex items-center gap-3">
                <Button className="bg-[#0F2A1D] hover:bg-[#0c2117]">
                  Send message
                </Button>
                <span className="text-xs text-gray-500">
                  Placeholder only (no submission wired yet).
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
