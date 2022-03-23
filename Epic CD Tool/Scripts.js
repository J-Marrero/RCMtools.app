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
    fetch("http://icd10api.com/?code="+ v + "&desc=short&r=json")
    .then(response => response.json())
    .then(data => {
      if(data.Valid == 1){
          var tagWrap = document.createElement("li");
          var anchor = document.createElement("a");
          anchor.className = "tag";
          var l = data.Name.substring(0, 3) + "." + data.Name.substring(3, x.length);
          anchor.innerText = l;
          anchor.title = data.Description;
          tagWrap.appendChild(anchor);
          document.getElementById("DxTaglist").appendChild(tagWrap)  
      }
    })
  }
};

function get_CPTCodes(x){
let regexp = /\d{4,4}[A-Z0-9]/g;
let matchAll = x.matchAll(regexp);
matchAll = Array.from(matchAll);
var taglist = document.createElement("ul")
taglist.className = "tags"
taglist.id = "CPTTaglist"
var ChildNode = document.getElementById("CPT_Container").childNodes[0]
document.getElementById("CPT_Container").replaceChild(taglist,ChildNode)
for(var v of matchAll){
  var tagWrap = document.createElement("li");
  var anchor = document.createElement("a");
  anchor.className = "tag";
  anchor.innerText = v;
  tagWrap.appendChild(anchor);
  document.getElementById("CPTTaglist").appendChild(tagWrap)  
  }
}

function ncd_validate(cpt,dx){
    for(var v of Index){
        if(v.CPT_Contents.includes(cpt) == true){
         return v.Contents.includes(dx)
            }
        }
    }

function check_cptcodes(){ 
    var headerrow = document.getElementById("Dx_Container").innerText.split("\n");
    headerrow.unshift("")
    var result = []
    var dx = document.getElementById("Dx_Container").innerText.split("\n");
    var cpt = document.getElementById("CPT_Container").innerText.split("\n");
    for(var v of cpt){
        var row = [v]
        for(var x of dx){
             row.push(ncd_validate(v,x))
        }
        result.push(row)
    }
result.unshift(headerrow)
console.log(result)
}