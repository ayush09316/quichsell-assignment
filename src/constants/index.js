export const dropdownOptions = [
    {
        label:"Grouping",
        submenu:[
            {
                label:"User",
                value:"user"
            },
            {
                label:"Status",
                value:"status"
            },
            {
                label:"Priority",
                value:"priority"
            }
        ]
    },
    {
        label:"Sorting",
        submenu:[
            {
                label:"Default",
                value:"default"
            },
            {
                label:"Title",
                value:"title"
            },
            {
                label:"Priority",
                value:"priority"
            }
        ]
    }
];


export const columnName ={
    "priority":{ 
        options: [
            { icon: './urgent.svg', label: 'Urgent',data:[],weight:4 },
            { icon: './high.svg', label: 'High',data:[] ,weight:3},
            { icon: './medium.svg', label: 'Medium',data:[],weight:2 },
            { icon: './low.svg', label: 'Low',data:[] ,weight:1},
            { icon: './no.svg', label: 'No priority',data:[],weight:0 },
          ]
    },
    "status":{
        options: [
            {icon: './Backlog.svg', label: 'Backlog',data:[] },
           { icon: './todo.svg', label: 'Todo',data:[] },
            { icon: './progress.svg', label: 'In progress',data:[] },
            { icon: './done.svg', label: 'Done',data:[] },
            {icon: './cancel.svg', label: 'Cancelled',data:[] },
            
          ]
    },
    "users":{
        options:[

        ]
    }
}
  


