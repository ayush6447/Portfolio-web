import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollProgress } from './components/ui/ScrollProgress';
import ClickSpark from './components/ui/ClickSpark';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <BrowserRouter>
      <ClickSpark
        sparkColor="#c084fc"
        sparkSize={12}
        sparkRadius={22}
        sparkCount={8}
        duration={450}
        easing="ease-out"
      >
        <ScrollProgress />
        <Layout>
          <Hero />
          <Projects />
          <Education />
          <Experience />
          <Skills />
          <Certifications />
          <About />
          <Contact />
        </Layout>
      </ClickSpark>
    </BrowserRouter>
  );
}

export default App;
