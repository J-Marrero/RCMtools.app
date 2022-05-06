var index = {
    createSelectList: function () {
        for (var category of this.rules) {
            //create categories in The NCD Dropdown
            for (var item of category){
                //create list items for each category in the dropdown

            }
        }
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
                    entryName: "NCD Policies",
                    default: false,
                    titles: []
                },
            ]
        }
    ]
}