
// se encarga de traerme la info que usaremos en el e-commerce//
async function getProducts(){
    try{
        const data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/');
         const res= await data.json();
        
        window.localStorage.setItem('products', JSON.stringify(res));
        return res;
    } 
    catch (error){
         console.log(error);
    }
 }

  function printProducts(bDatos) {
    const productsHTML = document.querySelector('.products');
   let html = ''
    for (const product of bDatos.products) {
        console.log(product);

        html += `
         <div class='product'>
           
         <div class="product_img">
         <img src="${product.image}" alt="imagen"/>
         </div>
         <div class="product_info">
            <h6 class='first'>
             
             <h4 class='name1'>$${product.price}
             <i class='bx bx-plus' id='${product.id}'></i> 
             </h4>
            
             <span><b>Stock</b>: ${product.quantity}</span>
             
             
             </h6>
             <p class='name2'> 
             ${product.name} 
            </p>
             </div>
             
 

          
         </div>
        
         `;

        
        productsHTML.innerHTML = html;
    }
  }

function handleShowCart(){
    const iconcartHTML = document.querySelector('.bx-cart');
   const cartHTML = document.querySelector('.cart');

   iconcartHTML.addEventListener('click',function(){
    cartHTML.classList.toggle('cart_show');
   })
}



 function addCartFromProducts(bDatos){
    const productsHTML = document.querySelector('.products');
    productsHTML.addEventListener('click',function(e){
       if(e.target.classList.contains('bx-plus')){
         const id = Number(e.target.id);
 
         const productFind = bDatos.products.find((product) => product.id === id)
      
     if(bDatos.cart[productFind.id]){
         if(productFind.quantity === bDatos.cart[productFind.id].amount) return alert('no tenemos mas en stock')
         bDatos.cart[productFind.id].amount++
     }else{
         bDatos.cart[productFind.id] = {...productFind, amount: 1} 
     }
 
     window.localStorage.setItem("cart", JSON.stringify(bDatos.cart))
 
      console.log(bDatos.cart)
      printProductsInCart(bDatos)
     }
    });
 
  }


function printProductsInCart(bDatos){
    const cardProducts = document.querySelector('.card_products');

    let html = ''

   for (const product in bDatos.cart) {
    const {quantity, price, name, image, id, amount}= bDatos.cart[product]
    console.log({quantity,price,name,image,id,amount})
    html += 
    `
    <div class='card_product'>
       <div class='card_product--img'>
             <img src= '${image}' alt='image' />
       </div>
       <div className='card_product--body'>
            <h4>${name} | $${price}</h4>
            <p>stock:${quantity}</p>
        <div class='card_product--body-op'>
        <i class='bx bx-minus' ></i>
                    <span>${amount}unit</span>
                    <i class='bx bx-plus' ></i>
                    <i class='bx bx-trash' ></i>
        </div>
       </div>
       
    
    </div>
  
  
  `
   }
    cardProducts.innerHTML = html

}




async function main(){
   const bDatos = {
        products: JSON.parse(window.localStorage.getItem('products')) ||  
        (await getProducts()),
        cart: JSON.parse( window.localStorage.getItem('cart') ) || {}
   };
   printProducts(bDatos);
   handleShowCart(); 
   addCartFromProducts(bDatos)
   printProductsInCart(bDatos)

   
}  
main(); 

