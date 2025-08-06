import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChristmasWedding from '@/components/ChristmasWedding';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return <ChristmasWedding />;
};

export default NotFound;
