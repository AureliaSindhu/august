import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Background from "@/components/ui/background";
import ResCard from "@/components/ResCard";
import ResultActions from "@/components/ResAct";

export default function Mood() {
  return (
    <div className="bg-black min-h-screen">
      <Background>
        <main className="relative isolate min-h-screen w-full overflow-hidden text-white flex flex-col">
          <Nav />
          <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4 w-full">
            <ResCard />
            <ResultActions />
          </div>
          <Footer />
        </main>
      </Background>
    </div>
  );
}
