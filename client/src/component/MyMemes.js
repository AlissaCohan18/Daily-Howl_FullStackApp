import { useEffect, useState } from "react";

const MyMemes = ({ meme, user, isDashboard }) => {
  const [createdMeme, setCreatedMeme] = useState("");

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const response = await fetch(`/api/memes/${meme}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setCreatedMeme(json);
    }
  };

  console.log({ createdMeme });
  console.log("this works at least");
  return (
    <div className="pictureCard">
      <img src={createdMeme.memeUrl} className="main-photo" alt="dog" />
      <p>{createdMeme.memeText}</p>
      {isDashboard ? <p>hello</p> : <p>{createdMeme.username}</p>}
    </div>
  );
};

export default MyMemes;
