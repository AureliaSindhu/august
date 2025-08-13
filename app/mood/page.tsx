import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Background from "@/components/ui/background";
import MoodContent from "@/components/MoodCnt";

export default function Mood() {
    return (
        <div className="bg-black">
            <Background>
            <main className="relative isolate min-h-screen w-full overflow-hidden text-white flex flex-col">
                <Nav />
                <div className="flex-1 flex items-center justify-center">
                    <MoodContent />
                </div>
                <Footer />
            </main>
            </Background>
        </div>
    );
}