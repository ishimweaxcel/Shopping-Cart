import { useState } from "react";
import {useQuery} from 'react-query';
//components
// import {RxDashboard} from 'react-icons/rx';
// import {LuStretchVertical} from 'react-icons/lu';
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper, StyledButton } from "./App.styles";

export type CartItems ={
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItems[]> => await (await fetch('https://fakestoreapi.com/products')).json();

const App = () =>{
  const [cartIsOpen, SetCartIsOpen] = useState(false);
  const [cartProducts, SetCartProducts] = useState ([] as CartItems[])
  const {data, isLoading, error} = useQuery<CartItems[]>('products', 
  getProducts);
  console.log(data);

  const getTotalItems = (items: CartItems[]) => 
  items.reduce((ack: number, item)=> ack+ item.amount,0);

  const handleAddToCart = (clickedItem: CartItems) => {
    SetCartProducts(prev => {
      const isItemInCart =prev.find(item => item.id === clickedItem.id)
     
      if (isItemInCart){
        return prev.map(item => 
          item.id === clickedItem.id ? {...item, amount: item.amount +1}:item
        );
      }
      return [...prev, {...clickedItem, amount: 1}];

    })
  };

  const handleRemoveFromCart = (id: number) => {
    SetCartProducts(prev => (
      prev.reduce((ack,item) => {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack, {...item,amount: item.amount -1}];
        }else {
          return [...ack, item]
        }
      } , [] as CartItems[])
    )
      
      )};

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong....</div>
  return (
    
     <Wrapper>
      {/* <nav>
       < RxDashboard/>
 <LuStretchVertical />   
    </nav> */}
    <Drawer anchor='right' open={cartIsOpen} onClose={()=> SetCartIsOpen(false)}>
        <Cart 
        cartProducts={cartProducts} 
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        />
    </Drawer>
    <StyledButton onClick={()=> SetCartIsOpen(true)}>
      <Badge badgeContent={getTotalItems(cartProducts)} color='error'>
        <AddShoppingCartIcon />
      </Badge>
    </StyledButton>
       <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
        ))}
       </Grid>
     </Wrapper>
  );
}

export default App;
