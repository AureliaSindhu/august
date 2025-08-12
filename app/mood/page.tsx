import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Mood() {
    return (
        <div className="bg-primary text-foreground min-h-screen flex flex-col justify-between">
            <Nav />
            <div className="flex-1 flex items-center justify-center">
                <h1>Mood</h1>
            </div>
            <Footer />
        </div>
    );
}