// Home.jsx
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";
import IrlandSVG from "@/assets/images/irland-svg";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import { getRandomTitle } from "@/utils/randomTitle";
import useNavigationHooks from "@/hooks/NavigationHooks";

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
          class="w-full h-full"
        >
          <path
            d="M262.483 -5.10959L1687.5 -30.0957L1661 1036.23L992.63 1036.23L262.483 -5.10959Z"
            fill="currentColor"
          />
          <path
            d="M991.501 1033.3L1663.5 1033.3L1663.5 2354L422 1930.5L991.501 1033.3Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <section className="relative flex flex-wrap max-h-screen overflow-hidden">
        {/* Left (Text) */}
        <div className="flex flex-col flex-1 items-center justify-center p-6">
          <div className="bg-intro-card p-8 space-y-6 rounded-lg shadow-card max-w-4xl w-full flex flex-col">
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

      <section className="relative p-20"></section>
      <section className="guides"></section>
      <section className="vans"></section>
      <section className="tools"></section>
    </MainLayout>
  );
};

export default Home;
