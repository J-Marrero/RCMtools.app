                                                                                                   //adds an event listener to write default settings if they have never been written
window.addEventListener('load', (event) => {
    try {
        checkSetting("Settings","firstrun")
      } catch (error) {
        setDefaultCookies()
        console.warn("FirstRun Wrote Default Settings")
      }
});

                                                                                                   //Set localstorage for first run settings (and change default settings)
function setDefaultCookies(){
    var datetime = new Date().toString()
    localStorage.setItem("Settings",'{"Statistics":{"setTime":"'+datetime+'"}, "Background_Settings":{"firstrun":false,"experimental":false}, "General_Settings": {"Dark_Mode": false,"Dyslexia_Font": false},"NCD_Settings":{"Supress_Duplicates": true}}')
}

                                                                                                   //check the localstorage for a setting
function checkSetting(settingGroup,Setting){
    if(Setting == null && settingGroup == null){
        console.log(JSON.parse(localStorage.Settings))
    } else {
    return JSON.parse(localStorage.Settings)[settingGroup][Setting]
    }
}

                                                                                                   //Adds the ability to modify settings
function changeSetting(settingGroup,Setting, newValue){
    var set_obj = JSON.parse(localStorage.Settings)
    set_obj[settingGroup][Setting] = newValue
    localStorage.setItem("Settings",JSON.stringify(set_obj))
}


                                                                                                   // Create a placeholder row for the CPT and DX tables, do some formatting to it to make it special.
function placeHolderFactory(callerClassName){
var blankCell = document.createElement('td')
    blankCell.setAttribute('colspan','4')
var text_node = document.createElement('i')
    text_node.className = 'hintText'
    text_node.innerText = 'Nothing here! Add some '+ callerClassName.toString() +' codes!'
blankCell.appendChild(text_node)
var blankRows = document.createElement('tr')
blankRows.appendChild(blankCell)

return blankRows
};

                                                                                                   //a function to clear the rows from a table
function clearTable(className){
   var referencedTable = document.getElementsByClassName(className)[0];
   var parentNode = referencedTable.getElementsByTagName('tbody')[0];
   while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
   }
};

                                                                                                   //factory to create rows from arrays of raw data provided by the 'get_' functions listed next
                                                                                                   //requires the use of "del_plcholder" to indicate a fancy delete button
function rowFactory(content){
    if(Array.isArray(content) == false){
      throw Error("The content provided is not an Array!")
    }
    if(content.length != 4||5){
      if(content.length < 4){
        throw Error("The array provided is too short!")
      } else if(content.length > 5){
        throw Error("The array provided is too long!")
      }
    }
    var rowTop = document.createElement("tr")
    content.forEach(element => {
        if(typeof element == 'string' && element != "del_plcholder"){
            var child = document.createElement('td')
            child.innerText = element
        } 
        if(typeof element == 'string' && element == "del_plcholder"){
            var child = document.createElement('div')
            child.className = "delete"
            child.setAttribute("onClick","this.parentNode.parentNode.removeChild(this.parentNode)")
        }
        rowTop.appendChild(child)
    });
    return rowTop
};

// function get_DxCodes(x) {
//     let dx_target = document.getElementsByClassName("DX_body")[0]
//     let regexp = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/g;
//     let matchAll = x.matchAll(regexp);
//     matchAll = Array.from(matchAll);
//     for(var v of matchAll){
//         if(duplicateCode(v) != true){
//         var resp_array = []
//         fetch("http://icd10api.com/?code="+ v + "&desc=short&r=json")
//         .then(response => response.json())
//         .then(data => {
//           if(data.Valid == 1){
//               resp_array.push(data.Name.substring(0, 3) + "." + data.Name.substring(3, x.length))
//               resp_array.push(data.Description)
//           if(NCS.Contents.includes(v)){
//               resp_array.push("🔴")
//               } else {
//               resp_array.push("🟢")
//               }
//               resp_array.push("del_plcholder")
//               dx_target.appendChild(rowFactory(resp_array))
//               resp_array = []          

//           }
//           if(data.Valid != 1){
//               resp_array.push(v)
//               resp_array.push(data.Error)
//               resp_array.push("🚩")
//               resp_array.push("del_plcholder")
//               dx_target.appendChild(rowFactory(resp_array))
//               resp_array = []
//           }
//         })

//         } else {throw Error(v + " is a Duplicate Diagnosis code.")}
//     } 
// };

// function get_CPTCodes(x) {
//     let cpt_target = document.getElementsByClassName("cpt_body")[0]
//     let regexp = /\d{4,4}[A-Z0-9]/g;
//     let matchAll = x.matchAll(regexp);
//     matchAll = Array.from(matchAll);
//     for(var v of matchAll){
//         var resp_Array = []
//         resp_Array.push(v[0])
//         for(var NCD_Instance of Index){
//             if(NCD_Instance.CPT_Contents.includes(v[0])){
//                 resp_Array.push(NCD_Instance.Title)
//             }
//         }
//         for(var Descrip_Instance of CPT_Descrip){
//             if(Descrip_Instance.CPT == v[0]){
//              resp_Array.push(Descrip_Instance.Description)
//             }
//         }
//         resp_Array.push("")
//         resp_Array.push("del_plcholder")
//         cpt_target.appendChild(rowFactory(resp_Array))
//     }
// };

// //helperfunction until Dx and Cpt checking can be integrated into a single function

// function check(x){
// get_CPTCodes(x)
// get_DxCodes(x)
// }

// function duplicateCode(dxCode){
//     //determine if this is a duplicate code
//     var Diagnosis_Element_Array = Array.from(document.getElementsByClassName("DX_body")[0].rows)
//     var Existing_Codes = []
//     Diagnosis_Element_Array.forEach(element => Existing_Codes.push(element.childNodes[0].innerText));
//     return Existing_Codes.includes(dxCode)
// }

                                                                                                   //creates Random Test data
function throwRandom(){
                                                                                                   //Establish a container in which to put CPT and DX codes
    var resp = new Array()
                                                                                                   //Get your Dx Codes
    for (let i = 0; i < Math.round(Math.random()*10); i++) {
        resp.push(Index[i].Contents[Math.round(Math.random()*10)]);
    }
    //Get your CPT Codes
    for (let i = 0; i < Math.round(Math.random()*10); i++) {
        if(Index[i].CPT_Contents.length > 1){
            var randombtwn = Math.floor(Math.random() * (Index[i].CPT_Contents.length - 0 + 1) + 0) 
            resp.push(Index[i].CPT_Contents[randombtwn]);
        } else {
            resp.push(Index[i].CPT_Contents[0]);   
        }
    }
    resp.forEach(element => {document.getElementsByTagName("textarea")[0].value += element + "\n"
    });
    
}

function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 82 && evtobj.ctrlKey && evtobj.altKey) throwRandom();                    //TODO #1
}

document.onkeydown = KeyPress;

function check(){
    var userInput = document.getElementsByTagName("textarea")[0].value
    if(userInput == null){
        Error("No user input to parse")
    }

    let dxregexp = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/g;                                     //do the Dx Codes first
    let matchAlldx = userInput.matchAll(dxregexp)
    matchAlldx = Array.from(matchAlldx);

    let cptregexp = /\d{4,4}[A-Z0-9]/g
    let matchAllcpt = userInput.matchAll(cptregexp)
    matchAllcpt = Array.from(matchAlldx);
    
    console.log(matchAlldx)
    console.log(matchAllcpt)

    if(checkSetting("NCD_Settings","Supress_Duplicates") == true){                                 //checks to see if duplicate supression is on
      //console.log(userInput.split('\n'))      
    }
}