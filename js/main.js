const headingEl = document.getElementById("heading-el");
const descriptionEl = document.getElementById("description-el");
const addButton = document.getElementById("add-button-el")
const clearButton = document.getElementById("clear-button-el")
let todoListEl = document.getElementById("todo-list-el")

let todoList = [];
let todoItems = "";

todoList = JSON.parse(localStorage.getItem("todo"));

let todoFromLocalStorage = localStorage.getItem('todo');
todoList = JSON.parse(todoFromLocalStorage);

addButton.addEventListener("click", addEntry);

function addEntry(e){

    let headingText = headingEl.value;
    let descriptionText = descriptionEl.value;
    if(headingText && descriptionText)
    {
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

    

}



function render(arrayInput){

    let list;
    if(arrayInput.length<1){
        todoListEl.innerHTML = "<h3>*** Add things to do! ***</h3>"; 
    }
    else{

        for(let i=0; i<arrayInput.length; i++){
            list+=(`<li>
                <div>   
                    <div class="complete-checkbox">
                        <input type="checkbox" onchange="checkboxToggle(this)" id="check-${i}" class="custom-cb">
                        <h2> ${arrayInput[i].heading}</h2>
                    </div>
                    <p>${arrayInput[i].description}</p>
                </div>
            </li>`
            )

        todoListEl.innerHTML = list;   
        }
    }
}

functionCalled = 0;
function checkboxToggle(){
    functionCalled++;
    console.log("click")

    for(let i=0; i<todoList.length; i++){
        
        let checkCheck;
        checkCheck = document.getElementById(`check-${i}`).checked;

        if(checkCheck){
            let secFunc, seconds = 0 ;
            secFunc = setInterval(function(){
                seconds++;
                if(seconds>2){
                    clearInterval(secFunc);                                
                    todoList.splice(i,1);
                    render(todoList);
                    localStorage.setItem("todo", JSON.stringify(todoList));
                }
            }, 1000)
        }
    } 
    
}

render(todoList);




