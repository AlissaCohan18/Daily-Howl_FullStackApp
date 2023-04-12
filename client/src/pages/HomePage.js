import Beagle from "../beagle.jpeg";


const HomePage = () => {

  return (
    <div>
      <h1>The Daily Howl trial on 4/12 at 3:24pm</h1>
      <img src={Beagle} className="home-photo" alt="dog" />
    </div>
  );
};

export default HomePage;
