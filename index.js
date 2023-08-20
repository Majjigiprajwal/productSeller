const fetchProducts = async ()=>{
    try{
      let  response = await axios.get('https://crudcrud.com/api/162fe5f7a4c74ac99c43522b0db5a82b/products')
      var element = document.getElementById('products');
      var totalPrice =0;
      response.data.forEach((product)=>{
        totalPrice=totalPrice+Number(product.price);
        var item =  document.createElement('p');
       item.textContent=`${product.product}-${product.price}`
       var deleteButton = document.createElement('button');
       deleteButton.textContent="Delete Product";
       deleteButton.id=`${product._id}`;
       deleteButton.addEventListener('click',deleteProducts)
       item.appendChild(deleteButton);
       element.appendChild(item);
       document.getElementById('price').textContent=totalPrice;
      })
    }
    catch(error){
       console.log(error);
    }
}

document.addEventListener('DOMContentLoaded',fetchProducts);
const onSubmit= (e)=>{
    e.preventDefault();
    let productName = document.getElementById('product').value;
    let productPrice = document.getElementById('productPrice').value;
    if(productName!=="" && productPrice!=""){
        const product ={
            product:productName,
            price:productPrice,
        }
       AddProducts(product);
    }
    else{
        console.log('error occured');
    }
}

const AddToTotalPrice = (price)=>{
     var priceElement = document.getElementById('price');
     console.log(priceElement)
     let currentTotal = priceElement.innerText;
     console.log(currentTotal)
     let totalPrice = Number(currentTotal) + Number(price);
     priceElement.innerText=totalPrice;
}

const SubFromTotalPrice = (price)=>{
    var priceElement = document.getElementById('price');
    console.log(priceElement)
    let currentTotal = priceElement.textContent;
    console.log(currentTotal)
    let totalPrice = parseInt(currentTotal)-parseInt(price);
    priceElement.innerText=totalPrice;
}

const deleteProducts = async (e)=>{
    let id = e.target.id;
    console.log(id)
     try{
        let response = await axios.get(`https://crudcrud.com/api/162fe5f7a4c74ac99c43522b0db5a82b/products/${id}`);
         await axios.delete(`https://crudcrud.com/api/162fe5f7a4c74ac99c43522b0db5a82b/products/${id}`);
         var parent = document.getElementById(e.target.id).parentElement;
         parent.remove();
         SubFromTotalPrice(response.data.price)
     }
     catch(error){
         console.log(error);
     }
}

const AddProducts= async (product)=>{
   try{
       let response = await axios.post('https://crudcrud.com/api/162fe5f7a4c74ac99c43522b0db5a82b/products',product)
       console.log(response);
       var products = document.getElementById('products')

       var item =  document.createElement('p');
       item.textContent=`${response.data.product}-${response.data.price}`
       var deleteButton = document.createElement('button');
       deleteButton.textContent="Delete Product";
       deleteButton.id=`${response.data._id}`;
       deleteButton.addEventListener('click',deleteProducts)
       item.appendChild(deleteButton);
       products.appendChild(item);
       AddToTotalPrice(response.data.price);
       document.getElementById('product').value="";
       document.getElementById('productPrice').value="";
   }
   catch(error){
     console.log('error')
   }
}

var form = document.getElementById('form');
form.addEventListener('submit',onSubmit);

