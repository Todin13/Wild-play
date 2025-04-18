// Home.jsx
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/home.css";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import { getRandomTitle } from "@/utils/randomTitle";
import useNavigationHooks from "@/hooks/NavigationHooks";

const Home = () => {
  const { goToSearch } = useNavigationHooks();

  return (
    <MainLayout>
      <section className="introduction">
        <div className="flex flex-col">
          <Title variant="section">{getRandomTitle()}</Title>
          <p className="text-center p-10 mx-auto max-w-4xl">
            Looking to escape the ordinary? With Wild Play, you can easily rent
            a fully-equipped van and design your dream trip. Whether you're
            seeking mountain peaks, coastal roads, or quiet forests, our app
            helps you plan every step — from your route to the best spots to
            stop along the way. Ready to explore? Rent your van today and let
            the adventure begin!
          </p>
          <Button variant="primary" onClick={goToSearch}>
            Start Your Journey
          </Button>
        </div>
        <div className=""></div>
      </section>
      <section className="presentation"></section>
      <section className="guides"></section>
      <section className="vans"></section>
      <section className="tools"></section>
    </MainLayout>
  );
};

export default Home;
