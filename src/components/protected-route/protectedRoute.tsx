import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

export type TProtectedRouteProps = {
  authOnly?: boolean;
  children: ReactNode | ReactNode[];
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  authOnly = false,
  children
}) => {
  const { pathname, state } = useLocation();
  const user = useSelector((state) => state.user.data);

  if (authOnly && !user) {
    return <Navigate to='/login' state={{ from: pathname }} />;
  }

  if (user && !authOnly) {
    const { from } = state || { from: '/' };
    return <Navigate to={from} />;
  }

  return children;
};
