import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';

const queryClient = new QueryClient();

const AppContent = () => {
  const {
    data: schedule,
    isLoading,
  } = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (isLoading) return "Loading...";
  if (!schedule) return "Data unavailble";
  return (
    <>
      <Banner title={schedule.title}/>
      <TermPage courses={schedule.courses}/>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent/>
    </QueryClientProvider>
  );
}

export default App;
