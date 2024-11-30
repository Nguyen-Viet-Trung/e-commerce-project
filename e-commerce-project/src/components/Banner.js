import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Slideshow images (replace the src paths with actual paths or URLs)
  const slides = [
    {
      src: "https://i.ibb.co/k8rBV88/Banner3.png",
    },
    {
      src: "https://i.ibb.co/LQg688Y/Banner2.png",
    },
    {
      src: "https://i.ibb.co/YLqJfnq/Banner-Test.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className=''>
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <Link
            to={"/phone"}
            key={index}
            className={`mySlides fade ${index === slideIndex ? "active" : ""}`}
            style={{ display: index === slideIndex ? "block" : "none" }}
          >
            <img src={slide.src} alt={slide.caption} style={{ width: "100%", height:"auto", objectFit:"cover"}} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Banner;

