import HIW from "./components/HIW";
import Hero from "./components/Hero";
import Map from "./components/Map";
import TopRated from "./components/TopRated";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";


export default function Home() {
  return (
    <>
      <Hero />
      <HIW />
      <Map />
      <TopRated />
      <Reviews />
      <FAQ />
    </>
  );
}
