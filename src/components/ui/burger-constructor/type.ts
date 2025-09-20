import { TOrder, TOrderRequestItems } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TOrderRequestItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
