
import "./../scss/Home.scss"

export default function Home() {
  return (
    <section className="home">
        <div className="container">
            <div className="home__inner">
                <div className="home__top">
                    <h1 className="home__top-title">Welcome to SupaNext</h1>
                    <p className="home__top-text">A powerful Next.js application with Supabase integration</p>
                    <button className="home__top-button">Get Started</button>
                </div>
                <div className="home__content">
                  <div className="home__content-items">
                      <div className="home__content-card">
                        <h2 className="home__card-title">Fast & Secure</h2>
                        <p className="home__card-text">Built with Next.js and Supabase for speed and security.</p>
                      </div>
                      <div className="home__content-card">
                        <h2 className="home__card-title">Authentication</h2>
                        <p className="home__card-text">Seamless user authentication with Google, GitHub, and more.</p>
                      </div>
                      <div className="home__content-card">
                        <h2 className="home__card-title">Database & Storage</h2>
                        <p className="home__card-text">Manage data effortlessly with Supabases PostgreSQL and storage.</p>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </section>
  );
}
