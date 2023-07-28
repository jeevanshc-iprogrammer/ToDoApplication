const buttonAdd = document.getElementById("btnAdd");
const listBodyCom = document.querySelector(".listBodyCom");
const listBodyInCom = document.querySelector(".listBodyInCom");
const newTask = document.getElementById("newTask");


buttonAdd.addEventListener("click",()=>{
    if(newTask.value === ""){
        alert("Please enter some task")
    }else{
        const row = document.createElement("tr");
        row.id = "parent";

        const task = document.createElement("td");
        task.id = "child";
        task.textContent = newTask.value;

        document.getElementById("newTask").value = "";

        const action = document.createElement("td");
        action.id="childBtn"
        const moveBtn = document.createElement("button");
        moveBtn.id = "moveBtn"
        moveBtn.textContent = "Completed";
        action.appendChild(moveBtn);

        row.appendChild(task);
        row.appendChild(action);
        task.draggable = true;
        

        moveBtn.addEventListener("click",()=>{
            moveToCompleted(row,task.textContent);
        })

        listBodyInCom.appendChild(row);
        
        listBodyInCom.ondragover = function allowDrop(ev){
            ev.preventDefault();
        }

        listBodyInCom.ondrop = function drop(ev){
            var data = ev.dataTransfer.getData("text");
            listBodyInCom.appendChild(document.getElementById(data));
            // ev.target.appendChild(document.getElementById(moveBtn));
        }
    }      
})

function moveToCompleted(element,content){
    const ComRow = document.createElement("tr");
    ComRow.id = "parentCom"
    
    const ComTask = document.createElement("td");
    ComTask.textContent = content;
    ComTask.id = "childCom"

    element.remove();

    const ComAction = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.id = "delBtn"
    
    delBtn.textContent = "Delete";
    ComAction.appendChild(delBtn)
    ComRow.appendChild(ComTask);
    ComRow.appendChild(ComAction);

    ComRow.draggable = true;
    ComRow.ondragstart = function drag(ev){
        ev.dataTransfer.setData("text",ev.target.id );
    }

    delBtn.addEventListener("click",()=>{
        deleteContent(ComRow);
    })

    listBodyCom.appendChild(ComRow);
}

function deleteContent(element2){
    element2.remove();
}