import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavbar = () => {
  const navigate = useNavigate();

  const changeView = useCallback((view: string) => {
    navigate("/home", { state: { select: view } });
  }, [navigate]);

  return { changeView };
};