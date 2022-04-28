var label = function(){
    var control = document.createElement('p')
    control.innerText = this.value
    return control
}

var button = function(){
    var control = document.createElement("button")
    control.setAttribute("id",this.Name)
    control.setAttribute("style","float:right")
    control.setAttribute("onClick",this.action_function)
    if(this.Value == false){
        control.innerText = this.Name.replace("_"," ") + " - False"
        control.className = "button secondary clear"
    }else if(this.Value == true){
        control.innerText = this.Name.replace("_"," ") + " - True"
        control.className = "button primary clear"  
    }else if(typeof this.Value != 'boolean'){
        var control = document.createElement("button")
        control.setAttribute("id",this.Name)
        control.setAttribute("style","float:right")
        control.setAttribute("onClick",this.action_function)
        control.innerText = this.Name.replace("_"," ")
        control.className = "button alert clear"
        control.id = this.Name
    }
    return control
}

function dialog(IsFullReset,minorSettingName){
    if(IsFullReset != true){
        if(window.confirm("Are you sure you want to reset "+minorSettingName.replace("_"," ")+"?") == true){
            localStorage.setItem(minorSettingName,null)
            Metro.toast.create("Reset "+minorSettingName+" to Default!", null, null, "alert");
        }
    } else {
        if(window.confirm("Are you sure you want to reset "+minorSettingName.replace("_"," ")+"?") == true){
            setDefaultSettings()
        }
    }
}

function toggle(el){
    var elemId = el.id
    console.log("Clicked")
    if(el.className == "button primary clear"){               //starts as true
        el.className = ""
        el.className = "button secondary clear"
        el.innerText = ""
        el.innerText = el.id.replace("_"," ")+" - False"
        localStorage.setItem(el.id,false)
    } else if(el.className == "button secondary clear"){    //starts as false
        el.className = ""
        el.className = "button primary clear"
        el.innerText = ""
        el.innerText = el.id.replace("_"," ")+" - True"
        localStorage.setItem(el.id,true)
    }
}

let default_settings = [
    {
        Name: "Statistics",
        Default_Section_Display_Style: "display: none",
        Default_Tab_Class:"",
        Display: "none",
        Enabled: false,
        Child_Settings: [
            {
                Name: "Last_Time_Set",
                Parent_Name: "Statistics",
                Value: null,
                Description: "When was the last time that the settings were set to default.",
                Control_Node: label,
                Enabled: false,
                action_function: null
            },
            {
                Name: "First_Run",
                Parent_Name: "Statistics",
                Value: false,
                Description: "Is this the first time that this tool has been used?",
                Control_Node: label,
                Enabled: false,
                action_function: null
            },
            {
                Name: "Last_Visit",
                Parent_Name: "Statistics",
                Value: null,
                Description: "Last time this tool was visited",
                Control_Node: label,
                Enabled: false,
                action_function: null
            }
        ]
    },
    {
        Name: "Background_Settings",
        Default_Section_Display_Style: "display: none",
        Default_Tab_Class:"",
        Display: "none",
        Enabled: true,
        Child_Settings: [
               {Name:"Experimental",
                Parent_Name: "Background_Settings",
                Value:false,
                Description:"Is the tool showing experimental or nonstandard functionality?",
                Control_Node: button,
                Enabled:false,
                action_function: "toggle(this)",
                },
                {Name:"Verbose",
                Parent_Name: "Background_Settings",
                Value:true,
                Description:"Is the tool showing experimental or nonstandard functionality?",
                Control_Node: button,
                Enabled:false,
                action_function: "toggle(this)",
                }
            ]
    },
    { 
        Name: "General_Settings",
        Default_Tab_Display_Style: "display: block",
        Default_Tab_Class:"active",
        Display: "Block",
        Enabled: true,
        Child_Settings: [
               {Name:"Dark_Mode",
               Parent_Name: "General_Settings",
                Value:false,
                Description:"Dark mode shifts the color pallate into a less bright white and a darker easier on the eyes charcoal and black (Off by default)",
                Control_Node: button,
                action_function:"toggle(this)",
                Enabled:true},

                {Name:"Dyslexia_Font",
                Parent_Name: "General_Settings",
                Value:false,
                Description:"This Setting Changes all of the fonts used to a more dyslexia friendly font (Off By Default)",
                Control_Node: button,
                action_function:"toggle(this)",
                Enabled:true
                },
                {Name:"Reset_Settings",
                Parent_Name: "General_Settings",
                Value:"Reset",
                Description:"This will reset all of your settings. Be careful when clicking it, this action cannot be undone",
                Control_Node: button,
                Enabled:true,
                action_function: "dialog(true,'All_Settings')"
                }
            ]
    },
    { 
        Name: "NCD_Settings",
        Default_Section_Display_Style: "display: none",
        Default_Tab_Class:"", 
        Display: "Block",
        Enabled: true,
        Child_Settings: [
               {Name:"Supress_Duplicates",
               Parent_Name:"NCD_Settings",
                Value:true,
                Description:"This setting effects wether the tool automatically supresses duplicate procedure and diagnosis codes, if on, no duplicate codes will be processed. If set to off, all codes put into the tool will be processed. (On by default)",
                Control_Node: button,
                Enabled:true,
                action_function: "toggle(this)"
            },
            ]
    },
    { 
        Name: "Note_Settings",
        Default_Section_Display_Style: "display: none",
        Default_Tab_Class:"",
        Display: "Block",
        Enabled: true,
        Child_Settings: [
               {Name:"Reset_Notes",
                Parent_Name: "Note_Settings",
                Value:"Reset",
                Description:"This setting deletes all of your locally saved notes.",
                Control_Node: button,
                Enabled: true,
                action_function: "dialog(false,'User_Notes')"
            },
            { Name: "User_Notes", //todo figure out how to get from here to the user's notes (new Window?)
              Parent_Name: "Note_Settings",
              Value: null,
              Description: "The Location where all of your locally saved notes live, limited amount of space here",
              Enabled: false,
              action_function: null,
              Control_Node : button,
            }
        ]
    }
]

let default_notes = {
    Builder:function(x){
        var card = document.createElement("div")
        card.className = "card playing"
        var cardHead = document.createElement("div")
        cardHead.className = "card-header"
        var cardContent = document.createElement("div")
        cardContent.className = "card-content p-2"
        var cardFoot = document.createElement("div")
        cardFoot.className = "card-footer"
        
        var CardTitle = document.createElement("h4")
        CardTitle.innerText = x.Name
        cardHead.appendChild(CardTitle)

        var CardBody = document.createElement("p")
        CardBody.innerText = x.Text
        cardContent.appendChild(CardBody)

        var likeButton = document.createElement("button")
        var copyButton = document.createElement("button")
        copyButton.className = "mif-copy"
        copyButton.setAttribute("onclick","alert('this is what happens when you try to copy')")
        likeButton.className = "mif-star-empty"
        likeButton.setAttribute("onmouseover","this.className = 'mif-star-full'")
        likeButton.setAttribute("onmouseout","this.className = 'mif-star-empty'")

        cardFoot.appendChild(copyButton)
        cardFoot.appendChild(likeButton)


        card.appendChild(cardHead)
        card.appendChild(cardContent)
        card.appendChild(cardFoot)

        return card
    },
    Contents:[{
        ID : 0,
        Name:"Generic Phone Call Note",
        Text:"Some "+this.Name+" Stuff Goes Here",
    },
    {
        ID : 1,
        Name:"Generic Payment Note",
        Text:"Some "+this.Name+" Stuff Goes Here",
    },
    {
        ID : 2,
        Name:"Generic Transfer Note",
        Text:"Some "+this.Name+" Stuff Goes Here",
    },
    {
        ID : 3,
        Name:"Generic Medical Nescessity Adjustment",
        Text:"Some "+this.Name+" Stuff Goes Here",
    }]
}