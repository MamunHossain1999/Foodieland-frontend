import CategoryPage from "@/component/CategoryPage/CategoryPage";
import ChepSection from "@/component/ChepSection/ChepSection";
import HeroSection from "@/component/HeroSection/HeroSection";
import InstragramPage from "@/component/InstragramPage/InstragramPage";
import RecipesList from "../AllRecepis/pages/RecipesList";



const HomePage = () => {
    return (
        <div className="border border-gray-200 pb-12">
            <HeroSection />
            <CategoryPage/>
            <ChepSection/>
            <InstragramPage/>
            <RecipesList/>
            
        </div>
    );
};

export default HomePage;

