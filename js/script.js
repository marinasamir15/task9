 var siteName= document.getElementById("siteName");
 var siteUrl= document.getElementById("siteUrl");
 var searchInput=document.getElementById("searchInput");

 var  btnupdate=document.getElementById("btnupdate");
 var btnadd=document.getElementById("btnadd");
 var indexUpdate=0;

 var nameMessage=document.getElementById("nameMessage")
 var urlMessage=document.getElementById("urlMessage")
 
 var fixedBox=document.getElementById("fixed-box");
 var closeBtn =document.getElementById("closeBtn")
 var productList=[];
 if (localStorage.getItem("products")!=null){
 productList=JSON.parse(localStorage.getItem("products"));
 display();
 }


function addBook(){
    if(vaildationName()==true&&vaildationUrl()==true){
    var product={
      sName : siteName.value,
      sUrl:siteUrl.value
    }
    productList.push(product)
    localStorage.setItem("products",JSON.stringify(productList))
    console.log( productList)
    display()
    clearForm()   
}else{
  fixedBox.classList.replace('d-none','d-flex')
}}


function clearForm(){
    siteName.value='';
    siteUrl.value='';
}

function display(){
    var box="";
    for(var i=0;i<productList.length;i++){
     box+=`   <tr>
     <td>${i+1}</td>
     <td>${productList[i].sName}</td>
     <td>
       <a href="${productList[i].sUrl}" target="_blank"><button class="btn btn-success px-2"><i class="fa-solid fa-eye mx-2"></i>Visit</button></a>
     </td>
     <td>
     <button class="btn btn-outline-warning px-2 m-2"onclick="setproduct(${i})" ><i class="fa-solid fa-upload mx-2"></i>Update</button>
       <button class="btn btn-danger px-2 "onclick="deleter(${i})" ><i class="fa-solid fa-trash mx-2"></i>Delete</button>
     </td>
   </tr> `
    }
    document.getElementById("table-body").innerHTML=box; 
}

function deleter(index){
   productList.splice(index,1)
   localStorage.setItem("products",JSON.stringify(productList))
   display()
}

function search(){
    var term=searchInput.value;
    var box="";
    for(var i=0;i<productList.length;i++){
     if(productList[i].sName.toLowerCase().includes(term.toLowerCase())){
     box+=`   <tr>
     <td>${i+1}</td>
     <td>${productList[i].sName}</td>
     <td>
       <a href="${productList[i].sUrl}" target="_blank"><button class="btn btn-success px-2"><i class="fa-solid fa-eye mx-2"></i>Visit</button></a>
     </td>
     <td>
     <button class="btn btn-outline-warning m-2  px-2"onclick="setproduct(${i})" ><i class="fa-solid fa-upload mx-2"></i>Update</button>
       <button class="btn btn-danger px-2"onclick="deleter(${i})" ><i class="fa-solid fa-trash mx-2"></i>Delete</button>
     </td>
   </tr> `
    }
}
    document.getElementById("table-body").innerHTML=box; 
}


function setproduct(index){
indexUpdate=index;
var currentproduct=productList[index];
siteName.value=currentproduct.sName;
siteUrl.value=currentproduct.sUrl;
btnupdate.classList.remove('d-none');
btnadd.classList.add('d-none');

}
function update(){
    if(vaildationName()==true&&vaildationUrl()==true){
    var product={
        sName : siteName.value,
        sUrl:siteUrl.value
      }
      productList.splice(indexUpdate,1,product);
      localStorage.setItem("products",JSON.stringify(productList)) 
      display();
      btnupdate.classList.add('d-none');
      btnadd.classList.remove('d-none');
      clearForm()
}else{
  fixedBox.classList.replace('d-none','d-flex')
}}


function  vaildationName(){
  var text=siteName.value;
  var regexName=/^[a-zA-Z]{3,}$/
  if(regexName.test(text)){
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    nameMessage.classList.add("d-none")
    return true;
  }else{
    siteName.classList.remove("is-valid")
    siteName.classList.add("is-invalid")
    nameMessage.classList.remove("d-none")
    return false;

  }
}

function vaildationUrl(){
    var textU=siteUrl.value;
    var regexUrl=/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/gm
    if(regexUrl.test(textU)){
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid"); 
        urlMessage.classList.add("d-none");
        return true ; 
    }else{
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
        urlMessage.classList.remove("d-none");
        return false; 
    }
}
function closeBox(){
  fixedBox.classList.replace("d-flex","d-none")
}
closeBtn.addEventListener("click",function(){
  closeBox();
})

document.addEventListener("keyup",function(e){
  if (e.key=="Escape"){
      closeBox()
  }
  })