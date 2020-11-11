const menuItems=document.getElementById('MenuItems');
menuItems.style.maxHeight="0px"
function menutoggle(){
  if(menuItems.style.maxHeight==="0px"){
      menuItems.style.maxHeight="200px";
  }
  else{
    menuItems.style.maxHeight="0px"
  }
}


const cartBtn=document.querySelector(".cart-btn");
const closeCartBtn=document.querySelector(".close-cart");
const clearCartBtn=document.querySelector(".clear-cart");
const cartOverlay=document.querySelector(".cart-overlay");
const cartDOM=document.querySelector('.cart');
const cartContent=document.querySelector('.cart-content');
const cartItems=document.querySelector(".cart-items");
const cartTotal=document.querySelector(".cart-total");
const productsDOM=document.querySelector(".products-center");

// cart
let cart=[];
//getting the products
let buttonsDOM=[];
var productsdata={
    "items": [
      {
        "sys": { "id": "1" },
        "fields": {
          "title": "Dell Laptop",
          "price": 110.99,
          "image": { "fields": { "file": { "url": "./images/laptop-dell.jpg" } } }
        }
      },
      {
        "sys": { "id": "2" },
        "fields": {
          "title": "Lava Mobile",
          "price": 45.0,
          "image": { "fields": { "file": { "url": "./images/mobile-lava.jpeg" }  } }
        }
      },
      {
        "sys": { "id": "3" },
        "fields": {
          "title": "Canon Printer",
          "price": 12.99,
          "image": { "fields": { "file": { "url": "./images/printer-canon.jpeg" }} }
        }
      },
      {
        "sys": { "id": "4" },
        "fields": {
          "title": "Mac Laptop",
          "price":200.0,
          "image": { "fields": { "file": { "url": "./images/laptop-mac.png" } } }
        }
      },
      {
        "sys": { "id": "5" },
        "fields": {
          "title": "Gaming Laptop",
          "price": 88.99,
          "image": { "fields": { "file": { "url": "./images/laptop-gaming.jpg" } } }
        }
      },
      {
        "sys": { "id": "6" },
        "fields": {
          "title": "Racon Headphones",
          "price": 32.99,
          "image": { "fields": { "file": { "url": "./images/headphones-racon.jpeg" } } }
        }
      },
      {
        "sys": { "id": "7" },
        "fields": {
          "title": "Redmi Earphones",
          "price": 23.99,
          "image": { "fields": { "file": { "url": "./images/earphones-redmi.jpeg" } } }
        }
      },
      {
        "sys": { "id": "8" },
        "fields": {
          "title": "Kechoda Mobile",
          "price": 33.99,
          "image": { "fields": { "file": { "url": "./images/mobile-kechoda.jpeg" } } }
        }
      }
    ]
  }
  

class Products{
  getProducts(){
    let products=productsdata.items;
    products=products.map(item=>{
        const {title,price}=item.fields;
        const {id}=item.sys;
        const image=item.fields.image.fields.file.url;
        const amount=1;
        return{title,price,id,image,amount}
    })
    return products;
 }
}
//display products
class UI{
    displayProducts(products){
       let result="";
       products.forEach(product => {
           result+=`   <!--single product-->
           <article class="product">
              <div class="img-container">
                  <img src="${product.image}" class="product-img">
                  <button class="bag-btn" data-id="${product.id}"><i class="fa fa-shopping-cart"></i>
                       add to bag</button>
              </div>
              <h3>${product.title}</h3>
              <h4>$${product.price}</h4>
           </article>
           <!--end of single product-->`
       });
       productsDOM.innerHTML=result;
    }
    getBagButtons(){
        const buttons=[...document.querySelectorAll('.bag-btn')];
        buttonsDOM=buttons;
        console.log(buttons);
        buttons.forEach(button=>{
           let id=button.dataset.id;
           console.log(id);
           let inCart=cart.find(item=>item.id===id);
           if(inCart){
               console.log("i am in cart");
               button.textContent="In Cart";
               button.disabled=true;
           }
               button.addEventListener('click',(e)=>{
                  e.target.textContent="In Cart";
                  e.target.disabled=true;
                  //get product from products
                  let cartItem={...Storage.getProduct(id)
               };
                  //add product to the cart
                  cart=[...cart,cartItem];
                  //save cart in local storage
                  Storage.saveCart(cart);
                  //set cart values
                  this.setCartValue(cart);
                  //display cart item
                  this.addCartItem(cartItem);
                  //show the cart
                  this.showCart();
               })
           
        })
    }
    setCartValue(cart){
        let tempTotal=0;
        let itemsTotal=0;
        cart.map(item=>{
            tempTotal+=item.price*item.amount;
            itemsTotal+=item.amount;
        })
        cartTotal.innerHTML=parseFloat(tempTotal.toFixed(2));
        console.log("temptotal",tempTotal);
        console.log("itemstotal",itemsTotal);
        cartItems.textContent=itemsTotal;
    }
    addCartItem(item){
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=` <img src="${item.image}">
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div>
        <i class=" fa fa-chevron-up"  data-id=${item.id} ></i>
        <p class="item-amount">${item.amount}</p>
        <i class=" fa fa-chevron-down"  data-id=${item.id}></i>
        </div> `;
        cartContent.appendChild(div);
      }
    showCart(){
      cartOverlay.classList.add('transparentBcg');
      cartDOM.classList.add('showCart');
      }
      hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
      } 
    setUpApp(){
        cart=Storage.getCart();
        this.setCartValue(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
       
    } 
    populateCart(cart){
        cart.forEach(item=>this
          .addCartItem(item));
    }
    cartLogic(){
      //clear cart button
      clearCartBtn.addEventListener('click',()=>{
        this.clearCart();
      }
        );
     
      //cart functionality
      cartContent.addEventListener('click',event=>{
        if(event.target.classList.contains("remove-item")){
          let removeItem=event.target;
         let id=removeItem.dataset.id;
         cartContent.removeChild(removeItem.parentElement.parentElement);
         this.removeCartItems(id);
        }
        else if(event.target.classList.contains('fa-chevron-up')){
          let addAmount=event.target;
          let id=addAmount.dataset.id;
          let tempItem=cart.find(item=>item.id===id);
          tempItem.amount=tempItem.amount+1;
          Storage.saveCart(cart);
          this.setCartValue(cart);
          addAmount.nextElementSibling.innerHTML=tempItem.amount;
        }
        else if(event.target.classList.contains('fa-chevron-down')){
          let lowerAmount=event.target;
          let id=lowerAmount.dataset.id;
          let tempItem=cart.find(item=>item.id===id);
          tempItem.amount=tempItem.amount-1;
          if(tempItem.amount>0){
              Storage.saveCart(cart);
              this.setCartValue(cart);
          }
          else{
            cartContent.removeChild(lowerAmount.parentElement.parentElement);
            this.removeCartItems(id);
          }
          Storage.saveCart(cart);
          this.setCartValue(cart);
          lowerAmount.previousElementSibling.innerHTML=tempItem.amount;
        }
      })
    }
      clearCart(){
     let cartItems=cart.map(item=>item.id);
     console.log('cart items',cartItems);
     console.log("cartcontent.children",cartContent.children);
     console.log("cartcontent.children[0]",cartContent.children[0]);
     cartItems.forEach(id=>this.removeCartItems(id));
    
     while(cartContent.children.length>0){
       cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
    }
   removeCartItems(id){
    cart=cart.filter(item=>item.id!==id);
    this.setCartValue(cart);
    Storage.saveCart(cart);
    let button=this.getSingleButton(id);
    button.disabled=false;
    button.innerHTML=`<i class="fa fa-shopping-cart"></i>add to bag`;
   }
    getSingleButton(id){
     return buttonsDOM.find(button=>button.dataset.id===id);
      }

}

//local storage
class Storage{
    static saveProducts(products){
        console.log("hello");
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products=JSON.parse(localStorage.getItem('products'));
        return products.find(product=>
            product.id===id
        )
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const ui=new UI()
    const products=new Products();
    //setup app
    ui.setUpApp()
    //get all products
    console.log("hi");
    var product=products.getProducts();
    ui.displayProducts(product);
    Storage.saveProducts(product);
    ui.getBagButtons();
    ui.cartLogic();
  
})
