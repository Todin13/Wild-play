
/*

Home Page
Author: ODIN Thomas

*/
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";
import IrlandSVG from "@/assets/images/irland-svg";
import MountainSVG from "@/assets/images/mountain-svg";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import { getRandomTitle } from "@/utils/randomTitle";
import useNavigationHooks from "@/hooks/NavigationHooks";
import PhotoCarousel from "@/modules/PhotoCarousel";
import GuideCarousel from "@/modules/guides/carousel";
import VanCarousel from "@/modules/vans/carousel";
import photos from "@/data/photos.json";
import { useFirstTenGuides } from "@/hooks/GuideHooks";
import { useTypesVans } from "@/hooks/VanHooks";
import {
  MapPinIcon,
  MapIcon,
  ClipboardDocumentIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"; // Importing Heroicons
import ToolCard from "@/components/ui/ToolCard"; // The ToolCard component

const Home = () => {
  const { goToSearch } = useNavigationHooks();
  const { guides, loading_guides, error_guides } = useFirstTenGuides();
  const { vans, loading_van, error_van } = useTypesVans();

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
      <section className="relative w-full flex flex-col items-center justify-center px-6 py-24 lg:mb-48">
        <div className="w-auto max-w-2xl bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl px-6 py-6 text-center">
          <Title variant="section">Life on the Road</Title>
          <p className="mx-auto mt-4 text-textDark max-w-2xl">
            A glimpse of the freedom, views, and cozy vibes that come with van
            life.
          </p>
        </div>

        <PhotoCarousel photos={photos} />
      </section>

      {/* Section 3 - Guides */}
      <section className="relative flex flex-col justify-center items-center">
        <div className="flex justify-center desktop-only">
          <MountainSVG className="text-mountain-deepgreen w-full h-auto absolute" />
        </div>

        <div className="w-auto max-w-2xl bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl px-6 py-6 text-center mb:mb-24 lg:mb-48">
          <Title variant="section">Find Your Ultimate Travel Guide</Title>
          <p className="mx-auto mt-4 text-textDark max-w-2xl">
            Expert tips and route recommendations for an unforgettable journey.
          </p>
        </div>

        {loading_guides ? (
          <p className="relative text-3xl mb-6 mt-6 lg:mb-96">
            Loading guide...
          </p>
        ) : error_guides ? (
          <h1 className="relative text-red-500 text-3xl mb-6 lg:mb-96 mt-6">
            {error_guides}
          </h1>
        ) : guides.length > 0 ? (
          <div className="relative mb-12 mb:mb-48 lg:mb-96">
            <GuideCarousel guides={guides} />
          </div>
        ) : (
          <p className="relative text-3xl mb-6 mt-6 lg:mb-64">No guide found</p>
        )}
      </section>

      {/* Section 4 - Vans */}
      <section className="relative flex flex-col justify-center items-center">
        <div className="w-auto max-w-2xl bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl px-6 py-6 text-center mb:mb-24 lg:mb-48">
          <Title variant="section">Find Your Ultimate Van</Title>
          <p className="mx-auto mt-4 text-textDark max-w-2xl">
            Expertly selected vans for your next adventure on the road.
          </p>
        </div>

        {loading_van ? (
          <p className="relative text-3xl mb-6 mt-6 lg:mb-64">Loading van...</p>
        ) : error_van ? (
          <h1 className="relative text-red-500 text-3xl mb-6 mt-6 lg:mb-64">
            {error_van}
          </h1>
        ) : vans.length > 0 ? (
          <div className="relative mb-12 mb:mb-48 lg:mb-64">
            <VanCarousel vans={vans} />
          </div>
        ) : (
          <p className="relative text-3xl mb-6 mt-6 lg:mb-64">No van found</p>
        )}
      </section>

      {/* Section 5 - Tools */}
      <section className="relative flex flex-col justify-center items-center py-24 ">
        {/* Big Card Container for Tools */}
        <div className="max-w-screen-xl w-full lg:bg-deepgreen lg:rounded-2xl lg:shadow-2xl mb:bg-deepgreen mb:rounded-2xl mb:shadow-2xl p-12">
          <div className="desktop-only w-full text-center mb-12 flex flex-col">
            <Title variant="section" className="text-white">
              Explore Our Tools
            </Title>
            <p className="mx-auto mt-4 max-w-2xl text-white">
              A collection of essential tools to help you plan your adventure
              and make the most of your journey.
            </p>
          </div>

          <div className="mobile-only w-auto max-w-2xl bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl px-6 py-6 text-center mb-12 flex flex-col">
            <Title variant="section">
              Explore Our Tools
            </Title>
            <p className="mx-auto mt-4 text-textDark max-w-2xl">
              A collection of essential tools to help you plan your adventure
              and make the most of your journey.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="flex flex-wrap justify-center gap-12">
            {/* Van Location Tool */}
            <ToolCard
              title="Van Location"
              description="Find the current location of your van."
              icon={<MapPinIcon className="h-12 w-12 text-tool-darkgreen" />}
            />

            {/* Trip Creation Tool */}
            <ToolCard
              title="Create a Trip"
              description="Plan your trip from your current location and choose your destinations."
              icon={<MapIcon className="h-12 w-12 text-tool-darkgreen" />}
            />

            {/* Guide and Van Review Tool */}
            <ToolCard
              title="Guide & Van Reviews"
              description="Read reviews from other travelers on guides and vans."
              icon={
                <ClipboardDocumentIcon className="h-12 w-12 text-tool-darkgreen" />
              }
            />

            {/* Van Location from a Guide Tool */}
            <ToolCard
              title="Van Location from Guide"
              description="Get recommendations for van locations from expert guides."
              icon={<TruckIcon className="h-12 w-12 text-tool-darkgreen" />}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
