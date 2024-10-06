import { useDbData } from '../utilities/firebase';
import './Banner.css';

const Banner = () => {
  const [title, error] = useDbData("/title");

  return <h1 className="banner">{title}</h1>;
}

export default Banner;