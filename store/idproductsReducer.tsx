"use client";

import {
createContext,
useReducer,
ReactNode,
} from "react";

type CartItem = {
id: number;
count: number;


};

type Order = {
id: string;
items: CartItem[];
total: number;
address: string;
phone: string;
status: "pending" | "approved" | "in-delivery" | "delivered";
date: string;
};

type State = {
cart: CartItem[];
orders: Order[];
  
};

type Action =
| {
type: "ADD_TO_CART";
payload: {
id: number;
count: number;
};
}
| {
type: "increment";
payload: number;
}
| {
type: "decrement";
payload: number
}
| {
type: "REMOVE_FROM_CART";
payload: number;
}
|
{
  type : "ADD_PRODUCT_QUANTITY"
  payload : {
    id:number,
    quantity:number
  }

}
|
{
  type: "CLEAR_CART";
}
|
{
  type: "ADD_ORDER";
  payload: Omit<Order, "id">;
};



const initialState: State = {
cart: [],
orders: []
};

export function reducer(
state: State,
action: Action
): State {
switch (action.type) {
case "ADD_TO_CART": {
const exists = state.cart.find(
(item) => item.id === action.payload.id
);


  if (exists) {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              count:
                item.count +
                action.payload.count,
            }
          : item
      ),
    };
  }

  return {
    ...state,
    cart: [
      ...state.cart,
      {
        id: action.payload.id,
     
        count: action.payload.count,
      },
    ],
  };
}

case "increment":
  return {
    ...state,
    cart: state.cart.map((item) =>
      item.id === action.payload
        ? {
            ...item,
            count: item.count + 1,
          }
        : item
    ),
  };

case "decrement":
  return {
    ...state,
    cart: state.cart
      .map((item) =>
        item.id === action.payload
          ? {
              ...item,
              count: item.count - 1,
            }
          : item
      )
      .filter((item) => item.count > 0),
  };

case "REMOVE_FROM_CART":
  return {
    ...state,
    cart: state.cart.filter(
      (item) => item.id !== action.payload
    ),
  };
  case "ADD_PRODUCT_QUANTITY":
  return {
    ...state,
    cart: state.cart.map((item) =>
      item.id === action.payload.id
        ? {
            ...item,
            count: action.payload.quantity,
          }
        : item
    ),
  };
  
case "CLEAR_CART":
  return {
    ...state,
    cart: [],
  };

case "ADD_ORDER":
  return {
    ...state,
    orders: [
      ...state.orders,
      {
        ...action.payload,
        id: Date.now().toString(),
      },
    ],
  };

default:
  return state;


}
}

type CartContextType = {
state: State;
dispatch: React.Dispatch<Action>;
};

export const CartContext =
createContext<CartContextType | null>(
null
);

type Props = {
children: ReactNode;
};

export default function CartProvider({
children,
}: Props) {
const [state, dispatch] = useReducer(
reducer,
initialState
);

return (
<CartContext.Provider
value={{ state, dispatch }}
>
{children}
</CartContext.Provider>
);
}
