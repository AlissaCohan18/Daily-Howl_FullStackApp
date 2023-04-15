import MemeUpdates from "../component/MemeUpdates";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [userObject, setUserObject] = useState(user);

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
    }
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      {userObject &&
        userObject.memes.map((meme, index) => (
          <div key={index}>
            <MemeUpdates meme={meme} user={user} isDashboard={true} />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
