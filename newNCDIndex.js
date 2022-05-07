var indexedList = {
    createSelectList: function () {
        var list_population = document.createElement("select")
        list_population.setAttribute("id","Rule_Selector")
        list_population.setAttribute("data-role","select")
        list_population.setAttribute("title","")
        list_population.setAttribute("multiple","true")
        for (var category of this.rules) {
            //create categories in The NCD Dropdown
            var categoryTitle = document.createElement("optgroup")
            categoryTitle.setAttribute("label",category.categoryName)
            for (var item of category.entries){
                //create list items for each category in the dropdown
                var option = document.createElement("option")
                if(item.default == true){
                    option.setAttribute("selected","true")
                }
                option.setAttribute("value",item.entryName.replace(" ","_"))
                option.innerText = item.entryName
                categoryTitle.appendChild(option)
            }
            list_population.appendChild(categoryTitle)
        }
        var target = document.getElementById("optionAnchor")
        target.appendChild(list_population)
    },
    rules: [
        {
            categoryName: "Government Policies",
            entries: [
                {
                    entryName: "NCD Policies",
                    default: true,
                    titles: []
                },
                {
                    entryName: "LCD Policies",
                    default: true,
                    titles: []


                },
            ]
        },
        {
            categoryName: "UHC Policies",
            entries: [
                {
                    entryName: "UHC Policy Number One",
                    default: false,
                    titles: []
                },
            ]
        }
    ]
}