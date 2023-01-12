import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSingIn = () =>{   
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      // console.log(user);
      const loggedInUser ={
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const handleGithubSingIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
      const  {displayName, photoURL, email} = result.user;
      // console.log(user);
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
  }

  const handleFacebookSingIn = () =>{
    signInWithPopup(auth, facebookProvider)
    .then(result =>{
      const  {displayName, photoURL, email} = result.user;
      console.log(result.user);
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
  }

  const handleSingOut = () =>{
    signOut(auth)
    .then( () =>{
      setUser({});
    })
  }

  return (
    <div className="App">
      {!user.name? 
        <div>
        <button onClick={handleGoogleSingIn}>Google sing in</button>
        <button onClick={handleGithubSingIn}>Github sing in</button>
        <button onClick={handleFacebookSingIn}>Facebook Sing In</button>
        </div> :
        <button onClick={handleSingOut}>Sing Out</button>
      }
      <br />
      {
        user.name && <div>
            <h2>Welcome {user.name}</h2>
            <p>I know your email address: {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
      }
    </div>
  );
}

export default App;
