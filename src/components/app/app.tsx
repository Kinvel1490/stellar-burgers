import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { FeedInfo, IngredientDetails, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredientSlice';
import { Modal } from '@components';
import { AppHeader } from '@components';
import { useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../services/user/actions';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    dispatch(getIngredients());
    if (accessToken) dispatch(getUser());
  }, []);
  const routerLocation = useLocation();
  const backgroundLocation = routerLocation.state?.background;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || routerLocation}>
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute authOnly>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute authOnly>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute authOnly>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title=''
                onClose={() => {
                  history.go(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title=''
                onClose={() => {
                  history.go(-1);
                }}
              >
                <ProtectedRoute authOnly>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
          <Route
            path='/feed/:feedNumber'
            element={
              <Modal
                title=''
                onClose={() => {
                  history.go(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
      {/* TODO MODALS ROUTES */}
    </div>
  );
};

export default App;
