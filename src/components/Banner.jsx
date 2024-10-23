import { useAuth, useDbData } from '../utilities/firebase';
import './Banner.css';

const Banner = () => {
  const { authed, email, signIn, signOut } = useAuth();
  const [title, error] = useDbData("/title");

  return (
    <h1 className="banner">
      {title}
      <button className="signin" onClick={authed ? signOut : signIn}>
        {authed ? <>{email}｜Sign Out</> : "Sign In"}
      </button>
    </h1>
  );
}

export default Banner;