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
                Control_Node: function(){
                    var control = document.createElement('p')
                    control.innerText = this.value
                    return control
                },
                Enabled: false,
                action_function: null
            },
            {
                Name: "First_Run",
                Parent_Name: "Statistics",
                Value: false,
                Description: "Is this the first time that this tool has been used?",
                Control_Node: function(){
                    var control = document.createElement('p')
                    control.innerText = this.value
                    return control
                },
                Enabled: false,
                action_function: null
            },
            {
                Name: "Last_Visit",
                Parent_Name: "Statistics",
                Value: null,
                Description: "Last time this tool was visited",
                Control_Node: function(){
                    var control = document.createElement('p')
                    control.innerText = this.value
                    return control
                },
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
        Enabled: false,
        Child_Settings: [
               {Name:"Experimental",
                Parent_Name: "Background_Settings",
                Value:false,
                Description:"Is the tool showing experimental or nonstandard functionality?",
                Control_Node: function(){
                    var control = document.createElement("input")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("type","checkbox")
                    control.setAttribute("data-role","switch")
                    control.setAttribute("data-material","true")
                    control.setAttribute("data-off","off")
                    control.setAttribute("style","float:right")
                    control.setAttribute("onchange",this.action_function)
                    return control
                },
                Enabled:false,
                action_function: null
                },
                {Name:"Verbose",
                Parent_Name: "Background_Settings",
                Value:true,
                Description:"Is the tool showing experimental or nonstandard functionality?",
                Control_Node: function(){
                    var control = document.createElement("input")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("type","checkbox")
                    control.setAttribute("data-role","switch")
                    control.setAttribute("data-material","true")
                    control.setAttribute("data-off","off")
                    control.setAttribute("style","float:right")
                    control.setAttribute("onchange",this.action_function)
                    return control
                },
                Enabled:false,
                action_function: null
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
                Control_Node: function(){
                    var control = document.createElement("input")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("type","checkbox")
                    control.setAttribute("data-role","switch")
                    control.setAttribute("data-material","true")
                    control.setAttribute("data-off","off")
                    control.setAttribute("style","float:right")
                    control.setAttribute("onchange",this.action_function)
                    return control
                },
                Enabled:true},

                {Name:"Dyslexia_Font",
                Parent_Name: "General_Settings",
                Value:false,
                Description:"This Setting Changes all of the fonts used to a more dyslexia friendly font (Off By Default)",
                Control_Node: function(){
                    var control = document.createElement("input")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("type","checkbox")
                    control.setAttribute("data-role","switch")
                    control.setAttribute("data-material","true")
                    control.setAttribute("data-off","off")
                    control.setAttribute("style","float:right")
                    control.setAttribute("onchange",this.action_function)
                    return control
                },
                Enabled:true},

                {Name:"Reset_Settings",
                Parent_Name: "General_Settings",
                Value:"Reset",
                Description:"This will reset all of your settings. Be careful when clicking it, this action cannot be undone",
                Control_Node:function(){
                    var control = document.createElement("button")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("style","float:right")
                    control.className = "button alert clear"
                    control.setAttribute("onClick","setDefaultCookies('Flag')")
                    control.innerText = this.Value
                    return control
                },
                Enabled:true,
                action_function: "setDefaultCookies('flag')"
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
                Control_Node: function(){
                    var control = document.createElement("input")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("type","checkbox")
                    control.setAttribute("data-role","switch")
                    control.setAttribute("data-material","true")
                    control.setAttribute("data-off","off")
                    control.setAttribute("style","float:right")
                    control.setAttribute("onchange",this.action_function)
                    return control
                },
                Enabled:true,
                action_function: null
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
                Control_Node:function(){
                    var control = document.createElement("button")
                    control.setAttribute("id",this.Parent_Name +'\/'+this.Name)
                    control.setAttribute("style","float:right")
                    control.className = "button alert clear"
                    control.setAttribute("onClick","setDefaultCookies('Flag')")
                    control.innerText = this.Value
                    return control
                },
                Enabled: true,
                action_function: "resetNotes()"
            }
        ]
    }
]