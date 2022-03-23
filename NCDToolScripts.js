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

function get_DxCodes(x) {
    let dx_target = document.getElementsByClassName("DX_body")[0]
    let regexp = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/g;
    let matchAll = x.matchAll(regexp);
    matchAll = Array.from(matchAll);
    for(var v of matchAll){
        if(duplicateCode(v) != true){
        var resp_array = []
        fetch("http://icd10api.com/?code="+ v + "&desc=short&r=json")
        .then(response => response.json())
        .then(data => {
          if(data.Valid == 1){
              resp_array.push(data.Name.substring(0, 3) + "." + data.Name.substring(3, x.length))
              resp_array.push(data.Description)
          if(NCS.Contents.includes(v)){
              resp_array.push("🔴")
              } else {
              resp_array.push("🟢")
              }
              resp_array.push("del_plcholder")
              dx_target.appendChild(rowFactory(resp_array))
              resp_array = []          

          }
          if(data.Valid != 1){
              resp_array.push(v)
              resp_array.push(data.Error)
              resp_array.push("🚩")
              resp_array.push("del_plcholder")
              dx_target.appendChild(rowFactory(resp_array))
              resp_array = []
          }
        })

        } else {throw Error(v + " is a Duplicate Diagnosis code.")}
    } 
};

function get_CPTCodes(x) {
    let cpt_target = document.getElementsByClassName("cpt_body")[0]
    let regexp = /\d{4,4}[A-Z0-9]/g;
    let matchAll = x.matchAll(regexp);
    matchAll = Array.from(matchAll);
    for(var v of matchAll){
        var resp_Array = []
        resp_Array.push(v[0])
        for(var NCD_Instance of Index){
            if(NCD_Instance.CPT_Contents.includes(v[0])){
                resp_Array.push(NCD_Instance.Title)
            }
        }
        for(var Descrip_Instance of CPT_Descrip){
            if(Descrip_Instance.CPT == v[0]){
             resp_Array.push(Descrip_Instance.Description)
            }
        }
        resp_Array.push("")
        resp_Array.push("del_plcholder")
        cpt_target.appendChild(rowFactory(resp_Array))
    }
};

//helperfunction until Dx and Cpt checking can be integrated into a single function

function check(x){
get_CPTCodes(x)
get_DxCodes(x)
}

function duplicateCode(dxCode){
    //determine if this is a duplicate code
    var Diagnosis_Element_Array = Array.from(document.getElementsByClassName("DX_body")[0].rows)
    var Existing_Codes = []
    Diagnosis_Element_Array.forEach(element => Existing_Codes.push(element.childNodes[0].innerText));
    return Existing_Codes.includes(dxCode.toUpperCase())
}