import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <NavbarHome />
      <div className='hero'>
        <h1>NO MORE TRIAL AND ERROR. JUST THERAPY SUCCESS</h1>
        <p>
          Description of the application and its features. Really cool stuff.
        </p>
      </div>

      <div className='why-section'>
        <h2>WHY YOU SHOULD TRY IT</h2>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
