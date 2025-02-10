import { Hero, CarouselWrapper, PlanPreview, CommunityPreview, SearchPreview } from './components';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CarouselWrapper />
      <PlanPreview />
      <SearchPreview />
      <CommunityPreview />
    </div>
  );
};

export default HomePage;
