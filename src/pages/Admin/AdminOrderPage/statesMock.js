const data0 = {
    found: true,
    states:[
        { 
            state: "just arrived", 
            created_at: new Date("2023-10-01 08:30:00") 
        },
        { 
            state: "accepted", 
            created_at: new Date("2023-10-03 09:45:00") 
        },
        { 
            state: "started", 
            created_at: new Date("2023-10-06 10:15:00") 
        },
        { 
            state: "paused", 
            created_at: new Date("2023-10-09 11:20:00") 
        },
    ]
}
const data1 = [
    { 
        state_id: 1, 
        state: "just arrived" 
    },
    { 
        state_id: 2, 
        state: "accepted" 
    },
    { 
        state_id: 3, 
        state: "started" 
    },
    { 
        state_id: 4, 
        state: "paused" 
    },
    { 
        state_id: 5, 
        state: "revising" 
    },
    { 
        state_id: 6, 
        state: "canceled" 
    },
    { 
        state_id: 7, 
        state: "to be delivered" 
    },
    { 
        state_id: 8, 
        state: "finished" 
    }
]
  


export {data0, data1}