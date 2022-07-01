const headingEl = document.getElementById("heading-el");
const descriptionEl = document.getElementById("description-el");
const addButton = document.getElementById("add-button-el")
const clearButton = document.getElementById("clear-button-el")
let todoListEl = document.getElementById("todo-list-el")

let todoList = [];

if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"));
}else{
    todoListEl.innerHTML = "<h3>***Add to do list**</h3>"; 
}

addButton.addEventListener("click", addEntry);
clearButton.addEventListener("click", function(){
    location.reload();
})

function addEntry(e){
    let headingText = headingEl.value;
    let descriptionText = descriptionEl.value;

    console.log(headingText);

    if(headingText && descriptionText){
        let entryValue = {
        "heading": headingText,
        "description": descriptionText
        }

        todoList.push(entryValue);

        headingEl.value = null;
        descriptionEl.value = null;
    }
    
    localStorage.setItem("todo", JSON.stringify(todoList));
    render(todoList);
    location.reload();
}

function render(arrayInput){
    let list =[];
    for(let i=0; i<arrayInput.length; i++){
        list+=(`<li>
            <div>   
                <div class="complete-checkbox">
                    <input type="checkbox" class="checkboxToggle" id="check-${i}" class="custom-cb">
                    <h2> ${arrayInput[i].heading}</h2>
                </div>
                <p>${arrayInput[i].description}</p>
            </div>
        </li>`
        )

    todoListEl.innerHTML = list;
 
    }
}

if(todoList){
    render(todoList);
}

let checkboxEl = document.getElementsByClassName("checkboxToggle");


for(let i=0; i<checkboxEl.length; i++){
    console.log(checkboxEl[i])
    document.getElementById(`check-${i}`).addEventListener("click", checkboxToggle);
}


functionCalled = 0;
function checkboxToggle(){
    functionCalled++;
    console.log("click")
    while(functionCalled === 2){
        location.reload();
        functionCalled = 0;
    }

    for(let i=0; i<todoList.length; i++){

        let checkCheck;
        checkCheck = document.getElementById(`check-${i}`).checked;

        if(checkCheck){
            let secFunc, seconds = 0 ;
            secFunc = setInterval(function(){
                seconds++;
                if(seconds>2){
                    if(todoList.length===1){
                        
                        todoList = [];
                        localStorage.clear();
                        render(todoList);
                        todoListEl.innerHTML = "<h3>***Add to do list**</h3>";  
                        location.reload(); 
                    } 
                    else{
                    clearInterval(secFunc);                                
                    todoList.splice(i,1);
                    render(todoList);
                    localStorage.setItem("todo", JSON.stringify(todoList));
                    location.reload();
                    
                    }
                }
            }, 1000)
        }
    } 

}






