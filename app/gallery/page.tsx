import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Background from "@/components/ui/background";
import GalleryGrid from "@/components/GalleryGrid";

export default function Gallery() {
    return (
        <div className="bg-black min-h-screen">
        <Background>
            <main className="relative isolate min-h-screen w-full overflow-hidden text-white flex flex-col">
            <Nav />
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4 w-full">
                <GalleryGrid />
            </div>
            <Footer />
            </main>
        </Background>
        </div>
    );
}