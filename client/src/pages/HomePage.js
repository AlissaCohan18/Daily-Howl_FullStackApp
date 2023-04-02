import Beagle from "../beagle.jpeg";


const HomePage = () => {

  return (
    <div>
      <h1>The Daily Howl</h1>
      <img src={Beagle} className="home-photo" alt="dog" />
    </div>
  );
};

export default HomePage;
