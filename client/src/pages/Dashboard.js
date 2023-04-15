import MemeUpdates from "../component/MemeUpdates";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Your Dashboard</h1>
      {user &&
        user.memes.map((meme, index) => (
          <div key={index}>
            <MemeUpdates meme={meme} user={user} isDashboard={true} />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
