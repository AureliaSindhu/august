import Background from "@/components/ui/background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-black text-white flex flex-col">
      <Background>
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <Hero />
        </div>
        <Footer />
      </Background>
    </main>
  );
}
