import {getOrders,getTransactions} from '../services/Api';


export async function TotalTransactions(){
    const Transactions= await getTransactions();
  
    const totaltransactions= Transactions.length;

    return totaltransactions;

}


export async function totalOrders(){
    const Orders= await getOrders();
  
    const totalorders= Orders.length;

    return totalorders;
}


export async function totalAmountTransacted(){
    let totalTransacted=0
    const Transactions= await getTransactions();

    Transactions.map((item,i)=>{
        console.log(item.pricePaid)
        totalTransacted+=parseInt(item.pricePaid);
 
      })
     
      return totalTransacted;
}