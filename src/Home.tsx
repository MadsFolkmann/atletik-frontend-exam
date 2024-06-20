import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Atletik Klub</h1>
                <p>
                    Velkommen til Atletik Klubbens officielle hjemmeside. Her kan du finde information om vores deltagere, discipliner og resultater.
                </p>
            </header>

            <main className="main-content">
                <section className="faciliteter-section">
                    <h2>Faciliteter</h2>
                    <div className="faciliteter">
                        <h3>Udforsk vores sektioner</h3>
                        <div className="facility-cards">
                            <Link to="/participants" className="facility-card">
                                <h4>Deltagere</h4>
                                <p>Se og administrer vores deltagere</p>
                            </Link>
                            <Link to="/disciplines" className="facility-card">
                                <h4>Discipliner</h4>
                                <p>Udforsk vores forskellige discipliner</p>
                            </Link>
                            <Link to="/results" className="facility-card">
                                <h4>Resultater</h4>
                                <p>Se og administrer resultaterne af vores discipliner</p>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="promo-section">
                    <h2>Kommende Begivenheder</h2>
                    <p>Hold øje med vores kalender for kommende atletikbegivenheder og konkurrencer.</p>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Mads Folkmann. Alle rettigheder forbeholdes.</p>
            </footer>
        </div>
    );
}
