import MemeUpdates from "../component/MemeUpdates";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Beagle from "../beagle2.png";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [userObject, setUserObject] = useState(user);
  const [isLoading, setIsLoading] = useState(true);

  //fetch user's created memes for dashboard
  useEffect(() => {
    if (user) {
      fetchUserObj();
    }
  }, [user]);

  const fetchUserObj = async () => {
    const response = await fetch(`/api/users/${user.userId}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setUserObject(json);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : userObject.memes.length > 0 ? (
        userObject.memes.map((meme, index) => (
          <div key={index}>
            <MemeUpdates
              meme={meme}
              user={user}
              refresh={() => fetchUserObj()}
              isDashboard={true}
            />
          </div>
        ))
      ) : (
        <div>
          <p>
            Welcome PAWtner! Search new pictures to create memes, and they will
            be saved here!<br></br>
            Also visit the Memes link to view what fellow pawtners have created.
            Enjoy!
          </p>
          <img src={Beagle} className="home-photo" alt="dog" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
