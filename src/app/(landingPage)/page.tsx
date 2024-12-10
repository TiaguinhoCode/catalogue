// Componentes
import { Banner } from "@/components/ui/landingPage/banner";
import { Main } from "@/components/ui/landingPage/main";

// Image
import bannerOne from "../../../public/banner.jpg"

export default function HomePage() {
    return (
        <>
            <Banner imagemUrl={bannerOne} />
            <Main />
        </>
    )
}