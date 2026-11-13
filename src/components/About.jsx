export default function About() {
  return (
    <section className="folio-section about" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <h2 id="about-title">About me</h2>
      </div>
      <div className="about-content">
        <p>I’m a self-taught software engineer based in Nigeria. I’m also studying computer science at Rivers State University. I’ve worked on software in a team, built applications directly for clients, and taken my own products from idea to working software.</p>
        <p>I design software to answer the questions people ask when something goes wrong. Did my work save when the connection dropped? What’s holding up this order? I make those states visible and test how the system recovers, so customers know what to do next and teams can trace the issue.</p>
        <p>I founded <a className="about-venture-link" href="/vexel/">VEXEL Group</a> to build software around how businesses work and develop products around needs people share. I’m developing VEETCH through VEXEL and built Daymark as a personal planning project. I use <a className="about-venture-link" href="#automation">automation</a> to take repetitive work off people’s hands and make it easier to see what changed when a job runs.</p>
      </div>
    </section>
  );
}
