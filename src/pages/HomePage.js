import Beagle from "../beagle.jpeg";
import Photo from "../component/Photo";


const HomePage = () => {
  return (
    <div>
      <h1>The Daily Howl</h1>
      <Photo props={Beagle}/>
    </div>
  );
};

export default HomePage;
