"use client";

// import Image from "next/image";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import SectionContainer from "@/components/common/SectionContainer";
import ProjectList from "@/components/common/ProjectList";
import { projectData } from "@/data/projectList";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Projects.module.scss";

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 3,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    onSelect();

    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleNext = () => {
    if (!emblaApi || !emblaApi.canScrollNext()) return;

    console.log("next");
    emblaApi.scrollNext();
  };

  const handlePrev = () => {
    if (!emblaApi || !emblaApi.canScrollPrev()) return;

    console.log("next");
    emblaApi.scrollPrev();
  };

  return (
    <SectionContainer title="Projects" text="実績" isBg={true}>
      <div className={styles["projects-inner"]}>
        <div className={styles["embla-wrap"]}>
          <div className={styles.embla} ref={emblaRef}>
            <ul className={styles.embla__container}>
              {projectData.map((project, index) => (
                <ProjectList
                  key={index}
                  src={project.src}
                  link={project.link}
                  text={project.text}
                />
              ))}
            </ul>
          </div>
          <div className={styles.sliderControls}>
            <button
              type="button"
              onClick={handlePrev}
              className={clsx(
                styles["sliderControls__btn"],
                styles["sliderControls__btn--prev"],
              )}
            >
              <ArrowLeft size={32} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={clsx(
                styles["sliderControls__btn"],
                styles["sliderControls__btn--next"],
              )}
            >
              <ArrowRight size={32} />
            </button>
          </div>
          <div className={styles.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${styles.embla__dot} ${
                  index === selectedIndex ? styles["embla__dot--active"] : ""
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Projects;
