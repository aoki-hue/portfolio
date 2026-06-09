import SectionContainer from "@/components/common/SectionContainer";
import { client } from "@/lib/microcms";
import styles from "./Projects.module.scss";
import ProjectsCarousel from "./ProjectsCarousel";

const Projects = async () => {
  const projectData = await client.get({
    endpoint: "projects",
  });

  return (
    <SectionContainer id="projects" title="Projects" text="実績" isBg={true}>
      <div className={styles["projects-inner"]}>
        <ProjectsCarousel projectData={projectData.contents} />
      </div>
    </SectionContainer>
  );
};

export default Projects;
