import { useEffect, useState } from "react";
import MyMemes from "../component/MyMemes";
import { useAuthContext } from '../hooks/useAuthContext'

const AllMemes = () => {
  const { user } = useAuthContext();

  //TODO:   isDashboard={false}

  return (
    <div>
      <h1>All Memes</h1>
      
    </div>
  );
};

export default AllMemes;