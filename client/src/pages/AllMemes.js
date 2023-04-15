import { useEffect, useState } from "react";
import MemeUpdates from "../component/MemeUpdates";
import { useAuthContext } from "../hooks/useAuthContext";

const AllMemes = () => {
  const { user } = useAuthContext();
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const response = await fetch(`/api/memes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      const filterData = json.filter((meme) => meme.username !== user.username);

      setMemes(filterData);
    }
  };

  return (
    <div>
      <h1>All Memes</h1>
      {memes &&
        memes.map((meme, index) => (
          <div key={index}>
            <MemeUpdates meme={meme} user={user} isDashboard={false} />
          </div>
        ))}
    </div>
  );
};

export default AllMemes;
