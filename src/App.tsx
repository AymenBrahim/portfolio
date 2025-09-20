import "./App.css";
import Layout from "./components/layout";
import AboutMe from "./sections/about-me";
import Collaborate from "./sections/collaborate";
import Hero from "./sections/hero";
import PersonalProjects from "./sections/personal-projects";
import ProfessionalProjects from "./sections/professional-projects";
import Experience from "./sections/experience";

function App() {
  return (
    <Layout>
      <Hero id="home" />
      <AboutMe id="about-me" />
      <section id="projects">
        <ProfessionalProjects id="professional-projects" />
        <PersonalProjects id="personal-projects" />
      </section>
      <Experience id="experience" />
      <Collaborate id="contact" />
    </Layout>
  );
}

export default App;
