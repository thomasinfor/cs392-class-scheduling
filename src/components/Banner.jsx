import { useJsonQuery } from '../utilities/fetch';
import './Banner.css';

const Banner = () => {
  const {
    data: schedule,
    isLoading,
  } = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (isLoading) return "";
  if (!schedule) return "";
  return <h1 className="banner">{schedule.title}</h1>;
}

export default Banner;