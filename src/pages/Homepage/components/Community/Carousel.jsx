import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './preview-style.css';

const Carousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(emblaApi => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);
  return (
    <div className="relative">
      <div className="community-embla">
        <div className="community-embla__viewport" ref={emblaRef}>
          <div className="community-embla__container">
            {slides.map((slide, index) => (
              <div className="community-embla__slide" key={index}>
                <div>{slide}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="community-embla__controls">
          <div className="community-embla__buttons">
            <button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="absolute top-133 -left-35  w-30 h-30 flex justify-center items-center rounded-full shadow-2md"
            >
              <img src="/icons/left-array.svg" alt="left-carousel-button" />
            </button>
            <button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="absolute top-133 -right-35  w-30 h-30 flex justify-center items-center rounded-full shadow-2md"
            >
              <img src="/icons/right-array2.svg" alt="right-carousel-button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
