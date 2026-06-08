"use client";

import { motion } from "motion/react";
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
    breakpoints: {
      "(max-width: 767px)": {
        slidesToScroll: 1,
      },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // コールバック内で実行（外部システムの更新）
    const handleInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    handleInit();
    emblaApi.on("init", handleInit);
    emblaApi.on("reInit", handleInit);

    return () => {
      emblaApi.off("init", handleInit);
      emblaApi.off("reInit", handleInit);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;

    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // コールバック内でのみ実行（Effect本体での呼び出しを避ける）
    const handleButtonUpdate = () => {
      updateButtons();
    };

    handleButtonUpdate();
    emblaApi.on("select", handleButtonUpdate);
    emblaApi.on("reInit", handleButtonUpdate);

    return () => {
      emblaApi.off("select", handleButtonUpdate);
      emblaApi.off("reInit", handleButtonUpdate);
    };
  }, [emblaApi, updateButtons]);

  return (
    <SectionContainer id="projects" title="Projects" text="実績" isBg={true}>
      <div className={styles["projects-inner"]}>
        <motion.div
          className={styles["embla-wrap"]}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
        >
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
              onClick={() => emblaApi?.scrollPrev()}
              disabled={prevBtnDisabled}
              className={clsx(
                styles["sliderControls__btn"],
                styles["sliderControls__btn--prev"],
              )}
            >
              <ArrowLeft size={32} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
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
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default Projects;
