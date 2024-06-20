import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">


        <h1>XXXXXX</h1>
        <p>XXXXXXXXX</p>
      </header>

      <main className="main-content">
        <section className="faciliteter-section">
          <h2>XXXXXXXXX</h2>
          <div className="faciliteter">
            <h3>XXXXXXXX</h3>
            <div className="facility-cards">

            </div>
          </div>
        </section>

        <section className="promo-section">
          <h2>XXXXXXXX</h2>
          <p>XXXXXXX</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Mads Folkmann. Alle rettigheder forbeholdes.</p>
      </footer>
    </div>
  );
}
