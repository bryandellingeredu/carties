
import { Auction } from "@/lib/types";
import AuctionCard from "./AuctionCard";

type Props = {
  auctions: Auction[];  
}
  

export default async function Listings({ auctions }: Props)
 { 
   
        return  ( 
            <div className='grid grid-cols-4 gap-6'    >  
              {auctions.map((auction) => (
                <AuctionCard  key={auction.id} auction={auction} />
              ))}   
            </div> 
        ); 
}        
