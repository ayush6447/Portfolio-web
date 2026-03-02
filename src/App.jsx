import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
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
    </BrowserRouter>
  );
}

export default App;
