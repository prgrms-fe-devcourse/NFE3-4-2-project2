import PropTypes from 'prop-types';

import useEmblaCarousel from 'embla-carousel-react';

const Container = ({ children, slideLength }) => {
  const options = { dragFree: true };
  const [emblaRef] = useEmblaCarousel(options);

  if (slideLength <= 4) {
    return (
      <div className="w-full p-10 border border-gray-6 border-dashed min-h-80px overflow-hidden">
        {children}
      </div>
    );
  } else {
    return (
      <div
        className="embla w-full p-10 border border-gray-6 border-dashed min-h-80px overflow-hidden"
        ref={emblaRef}
      >
        {children}
      </div>
    );
  }
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  slideLength: PropTypes.number,
};
