import useInitialFragment from "./useInitialFragment";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Automation from "./components/Automation";
import Experience from "./components/Experience";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";

export default function App() {
  useInitialFragment();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main className="shell" id="main" tabIndex="-1">
        <Hero />
        <Projects />
        <Experience />
        <Automation />
        <Technologies />
        <About />
      </main>
      <Contacts />
    </>
  );
}
