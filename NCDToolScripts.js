window.addEventListener('load', (event) => {                    //adds an event listener to write default settings if they have never been written                                                               
    createSettings() //'Writes' the settings page from Default-Settings.js
    populate_Notes() // Writes default Notes
    matchSettings()  // Matches settings UI to settings in localstorage
    localStorage.setItem("Last_Visit",new Date().toString())
    if(JSON.parse(localStorage.First_Run) == true){
        setDefaultSettings()
    }
    if (localStorage.Experimental != 'true'){
        whereAmI("file:///C:/Users/perso/Development/RCMtools.app/NCD%20Tool.html", "file:///C:/Users/perso/Development/RCMtools.app/Flask/NCD%20Tool.html")                        
    } else {
        verbose("Bypassed Location because this is an experimental version of this app","warn","Checking Where Am I?")
    }                                                 
});


function lab(){
    Metro.toast.create("Lab settings toggled",localStorage.setItem("Experimental",true), 2500, "success");
}

function setDefaultSettings(){
    var datetime = new Date().toString()
    for(var category of default_settings){
        for(var setting of category.Child_Settings){
            localStorage.setItem(setting.Name,JSON.stringify(setting.Value))
        }    
    }
    localStorage.setItem("Last_Time_Set",datetime)
    verbose("Set Default Cookies","warn","setDefaultCookies")
    Metro.toast.create("Reset Settings to Defaults!", null, null, "alert");
}

function placeHolderFactory(callerClassName) {                                                     // Create a placeholder row for the CPT and DX tables, do some formatting to it to make it special.
    var blankCell = document.createElement('td')
    blankCell.setAttribute('colspan', '4')
    var text_node = document.createElement('i')
    text_node.className = 'hintText'
    text_node.innerText = 'Nothing here! Add some ' + callerClassName.toString() + ' codes!'
    blankCell.appendChild(text_node)
    var blankRows = document.createElement('tr')
    blankRows.appendChild(blankCell)
    return blankRows
};

function clearTable(className) {                                                                   //a function to clear the rows from a table
    var referencedTable = document.getElementsByClassName(className)[0];
    var parentNode = referencedTable.getElementsByTagName('tbody')[0];
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};

function rowFactory(content, responsible) {                                                        //factory to create rows from arrays of raw data provided by the check function (YOUR ONE STOP SHOP FOR ALL YOUR CPT AND DX NEEDS)
    if (Array.isArray(content) == false) {                                                         //requires the use of "del_plcholder" to indicate a fancy delete button
        throw Error("The content provided is not an Array!")
    }
    if (content.length != 4 || 5) {
        if (content.length < 4) {
            throw Error("The array provided is too short!\n" + responsible)
        } else if (content.length > 5) {
            throw Error("The array provided is too long!\n" + responsible)
        }
    }
    var rowTop = document.createElement("tr")
    content.forEach(element => {
        if (typeof element == 'string' && element != "del_plcholder") {
            var child = document.createElement('td')
            child.innerText = element
        }
        if (typeof element == 'string' && element == "del_plcholder") {
            var child = document.createElement('div')
            child.className = "delete"
            child.setAttribute("onClick", "this.parentNode.parentNode.removeChild(this.parentNode)")
        }
        rowTop.appendChild(child)
    });
    return rowTop
};

function get_CPTCodes(x) {
    let cpt_target = document.getElementsByClassName("cpt_body")[0]
    let regexp = /\d{4,4}[A-Z0-9]/g;
    let matchAll = x.matchAll(regexp);
    matchAll = Array.from(matchAll);
    for (var v of matchAll) {
        var resp_Array = []
        resp_Array.push(v[0])
        for (var NCD_Instance of Index) {
            if (NCD_Instance.CPT_Contents.includes(v[0])) {
                resp_Array.push(NCD_Instance.Title)
            }
        }
        for (var Descrip_Instance of CPT_Descrip) {
            if (Descrip_Instance.CPT == v[0]) {
                resp_Array.push(Descrip_Instance.Description)
            }
        }
        resp_Array.push("")
        resp_Array.push("del_plcholder")
        cpt_target.appendChild(rowFactory(resp_Array))
    }
};

function throwRandom() {                                                                            //creates Random Test data
    var resp = new Array()                                                                          //Establish a container in which to put CPT and DX codes
    for (let i = 0; i < Math.round(Math.random() * 10); i++) {                                      //Get your Dx Codes
        resp.push(Index[i].Contents[Math.round(Math.random() * 10)]);
    }

    for (let i = 0; i < Math.round(Math.random() * 10); i++) {                                     //Get your CPT Codes
        if (Index[i].CPT_Contents.length > 1) {
            var randombtwn = Math.floor(Math.random() * (Index[i].CPT_Contents.length - 0 + 1) + 0)
            resp.push(Index[i].CPT_Contents[randombtwn]);
        } else {
            resp.push(Index[i].CPT_Contents[0]);
        }
    }
    resp.forEach(element => {
        document.getElementsByTagName("textarea")[0].value += element + "\n"
    });

}

function KeyPress(e) {                                                                             //a function that pushes a random set of dx and CPT codes into the tool's input field in order to test the use of the tool.
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 82 && evtobj.ctrlKey && evtobj.altKey) throwRandom();
};

document.onkeydown = KeyPress;

function check() {
    let cpt_target = document.getElementsByClassName("cpt_body")[0]                                //locate targets for the following function's DOM output
    let dx_target = document.getElementsByClassName("DX_body")[0]

    var userInput = document.getElementsByTagName("textarea")[0].value                             //Get the user's input
    if (userInput == null) {                                                                       //Handle a lack of input (Do user stuff here when no input is present)
        Error("No user input to parse")
    }

    var ParsedDx = []                                                                              //Run RegEx to find and get Diangnosis codes and put them into an array called ParsedDx
    let dxregexp = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/g;
    let matchAlldx = userInput.matchAll(dxregexp)
    matchAlldx = Array.from(matchAlldx)
    matchAlldx.forEach(element => { ParsedDx.push(element[0]) });

    var ParsedCPT = []                                                                             //Run RegEx to find and get CPT codes and put them into an array called ParsedCPT
    let cptregexp = /\d{4,4}[A-Z0-9]/g;
    let matchAllcpt = userInput.matchAll(cptregexp)
    matchAllcpt = Array.from(matchAllcpt)
    matchAllcpt.forEach(element => { ParsedCPT.push(element[0]) });

    if(JSON.parse(localStorage.Supress_Duplicates) == true) {                              //checks localstorage settings ("Settings.NCD_Settings.Supress_Duplicates") to see if duplicate supression is on
        var CPT = Array.from(new Set(ParsedCPT))                                                   //if Duplicate supression is on, process the arrays made from regEx into sets into arrays (we want the elements to come out of this process unified and the else part of this statement will just rename the array from the prior step)
        var DX = Array.from(new Set(ParsedDx))
    } else {
        var CPT = ParsedCPT
        var DX = ParsedDx
    }


    document.getElementById("rightPane").appendChild(createGrid(CPT, DX))
    for(var v of document.getElementsByClassName("alert cell")){    //works on #28 not why not firing with the function.
        v.innerText = "False"
    }
    for(var v of document.getElementsByClassName("success cell")){
        v.innerText = "True"
    }
    
    for (var v of DX) {                                                                            //for each diagnosis from the prior step (duplicate-safe or duplicate-dangerous)
        var resp_array = []
        fetch("http://icd10api.com/?code=" + v + "&desc=short&r=json")                             //send them to a free dx API found on the internet
            .then(response => response.json())                                                     //recieve responses
            .then(data => {
                if (data.Valid == 1) {                                                             //if the API response indicates that the user passed diagnosis code is valid
                    resp_array.push(data.Name.substring(0, 3) + "." + data.Name.substring(3, v.length))      //do a bunch of checking in the ncd tables
                    resp_array.push(data.Description)
                    if (NCS.Contents.includes(v)) {
                        resp_array.push("🔴")
                    } else {
                        resp_array.push("🟢")
                    }
                    resp_array.push("del_plcholder")
                    dx_target.appendChild(rowFactory(resp_array, "DX_PARSE"))
                    resp_array = []

                }
                if (data.Valid != 1) {
                    resp_array.push(v)
                    resp_array.push(data.Error)
                    resp_array.push("🚩")
                    resp_array.push("del_plcholder")
                    dx_target.appendChild(rowFactory(resp_array, "DX_PARSE"))
                    resp_array = []
                }
            })
    };
    for (var v of CPT) {
        var resp_Array = []
        resp_Array.push(v)
        for (var NCD_Instance of Index) {
            if (NCD_Instance.CPT_Contents.includes(v)) {
                resp_Array.push(NCD_Instance.Title)
            }
        }
        for (var Descrip_Instance of CPT_Descrip) {
            if (Descrip_Instance.CPT == v) {
                resp_Array.push(Descrip_Instance.Description)
            }
        }
        resp_Array.push("")
        resp_Array.push("del_plcholder")
        cpt_target.appendChild(rowFactory(resp_Array, "CPT_PARSE"))
    }

}

function createGrid(CPT, DX) {
    var Corner_Button = document.createElement('button')
        Corner_Button.className = "button alert clear babybutton"
        Corner_Button.setAttribute("onClick","clearTable('fred')")
        Corner_Button.innerText = "Clear"
    let response = [[null,]]
    for (var proc of CPT) {
        response[0].push(proc)
    }
    for (var diag of DX) {
        var temprow = []
        temprow.push(diag)
        for (var proc of CPT) {
            for (var n of Index) {
                if (n.CPT_Contents.includes(proc)) {
                    temprow.push(n.Contents.includes(diag))
                }
            }
        }
        response.push(temprow)
    }
    verbose(response,'log','createGrid')

    var tableNode = document.createElement("table")
    tableNode.className = "table subcompact cell-border fred"
    var tHeader = document.createElement("thead")
    var tBody = document.createElement("tbody")
    tBody.className = "row-hover column-hover"
    tableNode.appendChild(tHeader)
    tableNode.appendChild(tBody)

    for (var row of response) {
        if (response.indexOf(row) == 0) {
            var WorkingRow = document.createElement("tr")
            for (var cell of row) {
                if(cell == ""){
                    WorkingRow.appendChild(Corner_Button)
                }
                var WorkingCell = document.createElement("th")
                WorkingCell.innerText = cell
                WorkingRow.appendChild(WorkingCell)
            }
            tHeader.appendChild(WorkingRow)
        } else {
            var WorkingRow = document.createElement("tr")
            for (var cell of row) {
                var WorkingCell = document.createElement("td")
                if (cell == true) {
                    WorkingCell.className = "success cell"
                } else if (cell == false) {
                    WorkingCell.className = "alert cell"
                } else {
                    WorkingCell.innerText = cell
                }
                WorkingCell.innerText = cell
                WorkingRow.appendChild(WorkingCell)
            }
            tBody.appendChild(WorkingRow)
        }
    }

    verbose(tableNode,'log','createGrid')

    if (document.getElementById("rightPane").childElementCount == 1) {
        return tableNode
    } else {
        var incumbent = document.getElementById("rightPane").childNodes[1]
        document.getElementById("rightPane").removeChild(incumbent)
        return tableNode
    }
};

function whereAmI(Alpha, Beta) {
    var PWD = document.location.href
    var AWD = Alpha
    var AAWD = Beta
    verbose("Present Working Directory: " + PWD + "\nAccepted Working Directory: " + AWD + "\nAlternate Accepted Working Directory: " + AAWD,"log","whereAmI")
    if (PWD == AWD || PWD == AAWD) {
        verbose("Document Correctly Located","log","whereAmI")
    } else {
        document.body.innerHTML = ""
        Metro.dialog.create({
            title: "Are you using the correct file?",
            content: "<div>The File you are attempting to access is copy protected, you are seeing this because you have copied or are attempting to access an unsanctioned copy of the RCM-Tool.App local version. If you believe that you are recieving this message in error please feel free to contact the file's <a href='mailto:jomarrero@prohealthcare.com?subject=RCM-Tool.App%20Issue&body=Hi%20Josh!%2C%0D%0A%0D%0AIt%20looks%20like%20my%20version%20of%20RCM-Tool.App%20is%20not%20working.%20Here%20are%20some%20additional%20details%3A%0D%0A%0D%0AFile%20Location%3A%20" + PWD + "%0D%0ALast%20Settings%20Reset%3A%20" + localStorage.Last_Time_Set + "%0D%0A%0D%0ACould%20you%20get%20in%20touch%20with%20we%20so%20that%20we%20can%20take%20a%20look%20at%20it%3F%0D%0A%0D%0AThank%20You%2C%0D%0A%0D%0A%5Byour%20signature%20here%5D'>administrator</a>. If you would like to be redirected to the correct file, please click below.</div>",
            actions: [
                {
                    caption: "Redirect",
                    cls: "js-dialog-close alert",
                    onclick: function () {
                        window.location = AWD;
                    }
                },
                {

                    caption: "Leave",
                    cls: "js-dialog-close",
                    onclick: function () {
                        window.location = 'https://www.prohealthcare.com/';
                    }
                }
            ]

        });
    }
};

function verbose(output,urgency,caller){
    var feedback = "Verbose Feedback From: "+caller+"\n\n"+output
            if(JSON.parse(localStorage.Verbose) == true){
            if(urgency == "log"){
                console.log(feedback)
            }if(urgency == "warn"){
                console.warn(feedback)
            }if(urgency == "error"){
                console.error(feedback)
            }
        }
};

function createSettings(){
    var Settings_Menu = document.getElementById("Settings_Menu")
    for(var Major_Category of default_settings){
        var Settings_Section = document.getElementById('Settings')  //Create var for targetting the tab tray
        var Settings_MenuItem = document.createElement("li")        //Create Top level menu registrations for all settings in the 'default-settings' object
        var Settings_MenuAnchor = document.createElement("a")       //Create Anchor Elements to jump to Major Category sections
        Settings_MenuAnchor.href = "#"+Major_Category.Name
        Settings_MenuAnchor.setAttribute("onclick","document.title='NCD Tool - Settings - '+this.innerText")
        Settings_MenuItem.id = Major_Category.Name +"_Tab"
        Settings_MenuItem.className = Major_Category.Default_Tab_Class
        Settings_MenuAnchor.innerText = Major_Category.Name.replace("_"," ")
        Settings_MenuItem.setAttribute("style","display:"+Major_Category.Display)
        Settings_MenuItem.appendChild(Settings_MenuAnchor)
        Settings_Menu.appendChild(Settings_MenuItem)
        
        var tabContent = document.createElement("div") //create the div that contains the settings to be generated
        tabContent.setAttribute("style",Major_Category.Default_Section_Display_Style)
        tabContent.id = Major_Category.Name
        for(var Minor_Setting of Major_Category.Child_Settings){
            var card = document.createElement("div")
            card.className = "card bicycle"
            var cardHeader = document.createElement("div")
            cardHeader.className = "card-header"
            cardHeader.innerText = Minor_Setting.Name.replace("_"," ")
            var cardBody = document.createElement("div")
            cardBody.className = "card-content p-2"
            cardBody.innerText = Minor_Setting.Description
            var cardFoot = document.createElement("div")
            cardFoot.className = "card-footer"
            cardFoot.appendChild(Minor_Setting.Control_Node())
            card.appendChild(cardHeader)
            card.appendChild(cardBody)
            card.appendChild(cardFoot)
            tabContent.appendChild(card)
        }
        Settings_Section.appendChild(tabContent)
    }
    
}

function populate_Notes(){
    for(var note of default_notes.Contents){
        var list_item = document.createElement("li")
        list_item.appendChild(default_notes.Builder(note))
        document.getElementById("Notes_Zone").appendChild(list_item)
    }
}

function matchSettings(){
    for(var node of document.getElementsByClassName("bool")){
        if(node.innerText.search("True") > -1){
            var visual = true 
        } else if(node.innerText.search("False") > -1){
            var visual = false
        }
        var nodearr = [node,node.innerText,visual,localStorage.getItem(node.id.toString())]
        if(nodearr[2].toString() != null && nodearr[0].innerText.search("Reset") == -1 && nodearr[0].innerText != "User Notes" && nodearr[2].toString() != nodearr[3]){
            console.log(nodearr[0])
            toggle(nodearr[0])
            verbose("Updated UI values for "+ node.id,'Warn','matchsettings')
        } else {
            verbose("No Updates Needed!",'log','matchsettings')
    
        }
    
    }
}