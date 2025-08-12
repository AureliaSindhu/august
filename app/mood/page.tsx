import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Background from "@/components/ui/background";
import MoodContent from "@/components/MoodCnt";

export default function Mood() {
    return (
        <Background>
        <div className="bg-primary text-foreground min-h-screen flex flex-col justify-between">
            <Nav />
            <div className="flex-1 flex items-center justify-center">
                <MoodContent />
            </div>
            <Footer />
        </div>
        </Background>
    );
}