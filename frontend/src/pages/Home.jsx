// Home.jsx
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";
import IrlandSVG from "@/assets/images/irland-svg";
import MountainSVG from "@/assets/images/mountain-svg";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import { getRandomTitle } from "@/utils/randomTitle";
import useNavigationHooks from "@/hooks/NavigationHooks";
import PhotoCarousel from "@/modules/PhotoCarousel";
import photos from "@/data/photos.json";

const Home = () => {
  const { goToSearch } = useNavigationHooks();

  return (
    <MainLayout>
      {/* Diagonal Split Background */}
      <div className="desktop-only absolute top-0 right-0 w-full h-auto text-deepgreen">
        <svg
          viewBox="0 0 1662 2437"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M262.483 -55.1096L1687.5 -80.0957L1661 986.229L992.63 986.229L262.483 -55.1096Z"
            fill="currentColor"
          />
          <path
            d="M1076.4 746.099L1727.05 786.518L1806.49 1909.04L578.964 1474.41L1076.4 746.099Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Section 1 - Intro */}
      <section className="relative flex flex-wrap max-h-screen overflow-hidden md:mb-24">
        {/* Left (Text) */}
        <div className="flex flex-col flex-1 items-center justify-center p-6">
          <div className="bg-intro-card p-8 space-y-6 rounded-lg shadow-card max-w-xl w-full flex flex-col">
            <Title variant="section">{getRandomTitle()}</Title>
            <p className="text-center">
              Looking to escape the ordinary? With Wild Play, you can easily
              rent a fully-equipped van and design your dream trip. Whether
              you're seeking mountain peaks, coastal roads, or quiet forests,
              our app helps you plan every step — from your route to the best
              spots to stop along the way. Ready to explore? Rent your van today
              and let the adventure begin!
            </p>
            <Button variant="primary" onClick={goToSearch}>
              Start Your Journey
            </Button>
          </div>
        </div>

        {/* Right (Image) */}
        <div className="self-center desktop-only max-h-[85vh] flex-1">
          <IrlandSVG />
        </div>
      </section>

      {/* Section 2 - Carousel */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 py-24">
        <div className="w-auto max-w-2xl bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl px-6 py-6 text-center">
          <Title variant="section">Life on the Road</Title>
          <p className="mx-auto mt-4 text-textDark max-w-2xl">
            A glimpse of the freedom, views, and cozy vibes that come with van
            life.
          </p>
        </div>

        <PhotoCarousel photos={photos} />
      </section>

      <section className="guides">
        <div className="flex justify-center">
          <MountainSVG className="text-deepgreen w-full  h-auto" />
        </div>
      </section>
      <section className="vans"></section>
      <section className="tools"></section>
    </MainLayout>
  );
};

export default Home;
