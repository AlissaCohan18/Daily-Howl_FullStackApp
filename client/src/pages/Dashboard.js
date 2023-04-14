import { useEffect, useState } from "react";
import MyMemes from "../component/MyMemes";
import { useAuthContext } from '../hooks/useAuthContext'

const Dashboard = () => {
  const { user } = useAuthContext();



  return (
    <div>
      <h1>Your Dashboard</h1>
      {user && user.memes.map((meme) => (<MyMemes meme={meme} user={user} isDashboard={true} />))}
    </div>
  );
};

export default Dashboard;