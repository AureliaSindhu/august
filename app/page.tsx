import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-primary text-foreground min-h-screen flex flex-col justify-between">
      <Nav />
      <div className="flex-1 flex items-center justify-center">
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
