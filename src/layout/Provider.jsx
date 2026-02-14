import 'primereact/resources/themes/saga-blue/theme.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { CartProvider } from '@/context/CartContext';
import { WishListProvider } from '@/context/WishListContext';
import { DashboardProvider } from '@/context/DashboardContext';
import { UserProvider } from '@/context/UserContext';
import { FilterProvider } from '@/context/FilterContext';
        
export default function Provider({ children }) {
  return (
      <div>
           <UserProvider>
            <FilterProvider>
               <DashboardProvider>
               <CartProvider>
                  <WishListProvider>
                    <PrimeReactProvider >
                      {children}
                    </PrimeReactProvider>
                  </WishListProvider>
                </CartProvider>
               </DashboardProvider>
            </FilterProvider>
           
            </UserProvider>
        
   
         
         
      </div>
     
  );
}
