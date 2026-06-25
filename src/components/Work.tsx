import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Affirm | Senior Frontend Engineer",
    category: "Fintech • Jun 2024 – Present",
    tools: "React, TypeScript, Next.js, Turborepo, TanStack Query, Storybook, Radix UI",
    description: "Architected a modular frontend platform for financing and account-management journeys, improving performance, release safety, and consistency across multiple product surfaces.",
    images: [
      "/images/Affirm/Affirm.jpeg",
    ],
  },
  {
    title: "Chime | Frontend Engineer",
    category: "Fintech • May 2020 – Jun 2024",
    tools: "React, TypeScript, Redux Toolkit, React Query, Jest, React Testing Library, Cypress",
    description:
      "Built secure, mobile-first experiences for onboarding, identity verification, card management, transaction history, and account servicing within a regulated digital banking platform.",
    images: ["/images/Chime.jpeg"],
  },
  {
    title: "Wayfair | Frontend Developer",
    category: "E-Commerce • Jun 2019 – May 2020",
    tools: "React, JavaScript, Webpack, Jest, React Testing Library, HTML5, CSS3",
    description:
      "Developed responsive product discovery and merchandising experiences, including category navigation, filters, product cards, promotional modules, and product-detail interfaces.",
    images: ["/images/Wayfair.jpeg"],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                          <p>{project.description}</p>
                          <div className="carousel-description-gallery">
                            {project.images.map((image, imageIndex) => (
                              <img
                                className="carousel-description-image"
                                src={image}
                                alt={`${project.title} preview ${imageIndex + 1}`}
                                key={image}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
