function get_DxCodes(x){
let regexp = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/g;
let matchAll = x.matchAll(regexp);
matchAll = Array.from(matchAll);
var taglist = document.createElement("ul")
taglist.className = "tags"
taglist.id = "DxTaglist"
var ChildNode = document.getElementById("Dx_Container").childNodes[0]
document.getElementById("Dx_Container").replaceChild(taglist,ChildNode)
for(var v of matchAll){
    document.getElementById("DxTaglist").appendChild(addTag(v))
    }
}

function validate_dx(x){
var call = "http://icd10api.com/?code="+ x + "&desc=short&r=json"
fetch(call)
  .then(response => response.json())
  .then(data => n = data);
return n
}

function addTag(x){
//validate_dx(x)
//if(n.Valid == 1){
    //add some validation logic here
    var tagWrap = document.createElement("li")
    var anchor = document.createElement("a")
    anchor.className = "tag"
    anchor.innerText = x
//    anchor.href = "alert('"+n.Description+"')"
    tagWrap.appendChild(anchor)
    return tagWrap
//    }
    //ul class must be 'tags'	
}