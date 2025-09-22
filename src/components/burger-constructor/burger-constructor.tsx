import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { makeOrder, getOrderByNumber } from '../../services/order/actions';
import { onOrderModalClose } from '../../services/order/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.order.orderRequestItems
  );

  const dispatch = useDispatch();

  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);
  const orderNumber = useSelector((state) => state.order.newOrderNumber);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    let elemetsToOrder: string[] | undefined = [];
    elemetsToOrder.push(constructorItems.bun!._id);
    dispatch(
      makeOrder(constructorItems.ingredients.map((element) => element._id))
    );
  };

  if (orderRequest && !orderModalData) {
    dispatch(getOrderByNumber(orderNumber));
  }

  const closeOrderModal = () => {
    dispatch(onOrderModalClose());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun?.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
