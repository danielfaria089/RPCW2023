taskform = function (){
    return `
    <div class="w3-card-4">
        <header class="w3-container w3-purple">
            <h2>Task Form</h2>
        </header>
        <form class="w3-container" method="POST" id="form" action="/add">
            <fieldset>
                <legend>Task</legend>
                <label>Date due:</label>
                <input class="w3-input" type="date" name="dateDue" required/>
                <label>Who will do it:</label>
                <input class="w3-input" type="text" name="who" required/>
                <label>Task description:</label>
                <input class="w3-input" type="text" name="description" required/>
                <input type="hidden" name="id" value=""/>
            </fieldset>
            <br/>
            <button class="w3-btn w3-purple w3-mb-2" type="submit">Submit</button>
        </form>
    </div>
    `
}

toDo_Div = function (tasks){
    var div = `
                <div class="w3-card-4 w3-cell">
                    <table class="w3-table w3-bordered">
                    <tr>
                        <th>Task Description</th>
                        <th>Who will do it</th>
                        <th>Date due</th>
                        <th>Operations</th>
                    </tr>
    `

    for (var i = 0; i < tasks.length; i++) {
        div+=`
                    <tr>
                        <td>${tasks[i].description}</td>
                        <td>${tasks[i].who}</td>
                        <td>${tasks[i].dateDue}</td>
                        <td>
                            <form action="/done" method="POST">
                                <input type="hidden" name="id" value="${tasks[i].id}"/>
                                <button class="w3-btn w3-green" type="submit">Done</button>
                            </form>
                            <form action="/delete" method="POST">
                                <input type="hidden" name="id" value="${tasks[i].id}"/>
                                <button class="w3-btn w3-red" type="submit">Delete</button>
                            </form>
                            <button class="w3-btn w3-blue" onclick="edit('${tasks[i].id}','${tasks[i].description}','${tasks[i].who}','${tasks[i].dateDue}')">Edit</button>
                        </td>               
        `
    }

    div+=`
                </div>`

    return div
}

done_Div = function (tasks){
    var div = `
                <div class="w3-card-4 w3-cell">
                    <table class="w3-table w3-bordered">
                    <tr>
                        <th>Task Description</th>
                        <th>Who will do it</th>
                        <th>Date due</th>
                        <th>Operations</th>
                    </tr>
    `
    for (var i = 0; i < tasks.length; i++) {
        div+=`
                    <tr>
                        <td>${tasks[i].description}</td>
                        <td>${tasks[i].who}</td>
                        <td>${tasks[i].dateDue}</td>
                        <td>
                            <form action="/delete" method="POST">
                                <input type="hidden" name="id" value="${tasks[i].id}"/>
                                <button class="w3-btn w3-red" type="submit">Delete</button>
                            </form>
                            <button class="w3-btn w3-blue" onclick="edit('${tasks[i].id}','${tasks[i].description}','${tasks[i].who}','${tasks[i].dateDue}')">Edit</button>
                        </td>               
        `
    }

    div+=`
                </div>`

    return div
}

exports.fullpage = function (toDo,done) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
        </head>
        <body>`
    +taskform()
    +`
            </br>
            <div class="w3-cell-row">
    `
    +toDo_Div(toDo)
    +done_Div(done)
    +`
            </div>
            <script>
                function edit(id, description, who, dateDue){
                    if(document.getElementById("form").id.value != ""){
                        document.getElementById("form").id.value = ""
                        document.getElementById("form").description.value = ""
                        document.getElementById("form").who.value = ""
                        document.getElementById("form").dateDue.value = ""
                        document.getElementById("form").action = "/add"
                    }
                    else{
                        document.getElementById("form").action = "/edit"
                        document.getElementById("form").id.value = id
                        document.getElementById("form").description.value = description
                        document.getElementById("form").who.value = who
                        document.getElementById("form").dateDue.value = dateDue
                    }
                }
            </script>
        </body>
    </html>`
}