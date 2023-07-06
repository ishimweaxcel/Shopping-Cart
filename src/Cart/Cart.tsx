import CartItem from "../CartItem/CartItem1";
import {Wrapper} from './Cart.styles';
import { CartItems } from "../App";

type Props ={
    cartProducts: CartItems[];
    addToCart: (clickedItem: CartItems) => void;
    removeFromCart: (id: number)=> void;
};

const Cart: React.FC<Props> =({cartProducts, addToCart, removeFromCart})=> {
    const calculateTotal = (items: CartItems[]) =>
    items.reduce((ack:number, item) => ack + item.amount * item.price, 0);

    return(
        <Wrapper>
            <h2> Your cart</h2>
            {cartProducts.length === 0 ? <p>empty</p>: null}
            {cartProducts.map(item=> (
            
            <CartItem key= {item.id}
                      item= {item}
                      addToCart= {addToCart}
                      removeFromCart= {removeFromCart}
            />
            
            ))}
            <h2>Total: ${calculateTotal (cartProducts).toFixed(2)}</h2>
        </Wrapper>
    );
};

export default Cart;