import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "How do I search for a stay?",
    a: "Use the search bar on the homepage to select a region, dates, and guests. You’ll be taken to search results where you can filter and sort.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Cancellation depends on the property’s policy. You’ll see the policy on the property details page before confirming.",
  },
  {
    q: "How do I contact support?",
    a: "Use the Contact page and send us a message. We’ll respond as soon as possible.",
  },
  {
    q: "Are listings verified?",
    a: "We aim to feature trusted local stays. Verification details can be added per listing as the platform grows.",
  },
];

export default function Help() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
              Help Center
            </h1>
            <p className="mt-3 text-gray-700 max-w-3xl">
              Quick answers to common questions about searching, booking, and staying in Northern Pakistan.
            </p>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <Card key={item.q} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-700">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
