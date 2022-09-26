import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [resData, setresData] = useState("");

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);

    fetch("https://api.github.com/users/" + username)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setresData(data);
      });

    setUsername(" ");
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="formCard">
          <input type="text" onChange={handleUsernameInput} value={username} />
          <button>submit</button>
        </form>

      

        {resData && (resData.message!="Not Found") && (
          <div className="userDetailCard">
            <div className="userdetailBody">
              <h3 className="name">Name: {resData.name}</h3>
              <em className="username">Username: {resData.login}</em>
              <div className="follow">
                <p>Followers: {resData.followers} </p>
                <p>Following: {resData.following} </p>
              </div>
              <p>Public Repos: {resData.public_repos} </p>
              <p>Twitter: {resData.twitter_username} </p>
            </div>

            <div className="userImg ">
              <img src={resData.avatar_url} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
