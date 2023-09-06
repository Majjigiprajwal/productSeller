const fetchProducts = async ()=>{
    try{
      let  response = await axios.get('http://localhost:7000/expenses')
      var element = document.getElementById('expense-list');
      response.data.forEach((expense)=>{
        var item =  document.createElement('li');
       item.textContent=`${expense.description}-${expense.category}-${expense.amount}RS`
       item.classList="list-group-item list-group-item-danger"
       var deleteButton = document.createElement('button');
       deleteButton.textContent="Delete Expense";
       deleteButton.id=`${expense.id}`;
       deleteButton.classList="deleteBtn"
       deleteButton.addEventListener('click',deleteProducts)
       item.appendChild(deleteButton);
       element.appendChild(item);
      })
    }
    catch(error){
       console.log(error);
    }
}

document.addEventListener('DOMContentLoaded',fetchProducts);


const onSubmit= (e)=>{
    e.preventDefault();
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    let category = document.getElementById('Category').value;

    const expense ={
        description:description,
        amount:amount,
        category:category
    }

   AddProducts(expense);
   
}


const deleteProducts = async (e)=>{
    let id = e.target.id;
     try{
        let response =  await axios.post(`http://localhost:7000/expenses/${id}`);
        if(response.status === 200){
            var parent = document.getElementById(e.target.id).parentElement;
            parent.remove();
        }
        else{
            console.log('Cannot remove Expense')
        }
     }
     catch(error){
         console.log(error);
     }
}

const AddProducts= async (expense)=>{
   try{
       let response = await axios.post('http://localhost:7000/expenses',expense)
       var expenses = document.getElementById('expense-list')
       console.log(expenses);

       var item =  document.createElement('li');
       item.textContent=`${response.data.description}-${response.data.category}-${response.data.amount}RS`
       item.classList="list-group-item list-group-item-danger"
       var deleteButton = document.createElement('button');
       deleteButton.textContent="Delete Product";
       deleteButton.id=`${response.data.id}`;
       deleteButton.classList="deleteBtn"
       deleteButton.addEventListener('click',deleteProducts)
       item.appendChild(deleteButton);
       expenses.appendChild(item);
      
       document.getElementById('description').value="";
       document.getElementById('amount').value="";
       document.getElementById('Category').value="";
   }
   catch(error){
     console.log('error')
   }
}

var form = document.getElementById('form');
form.addEventListener('submit',onSubmit);

