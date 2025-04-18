// Home.jsx
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/home.css";
import { SectionTitle } from "@/components/ui/Titles"
import { getRandomTitle } from '@/utils/randomTitle';

const Home = () => {
  return (
    <MainLayout>
      <section className="introduction">
        <div className="">
          <SectionTitle>{getRandomTitle()}</SectionTitle>
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
