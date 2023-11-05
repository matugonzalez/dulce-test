const orders = [
    {
      order_id: 1,
      total_price: 100,
      created_at: new Date('2023-10-28T10:30:00'),
      updated_at: new Date('2023-10-30T15:20:00'),
      estimated_for: new Date('2023-11-05T12:00:00'),
      detail: 'Sample detail 1',
      last_state_change_at: new Date('2023-10-30T15:20:00'),
      state: 'Pending',
      email: 'client1@example.com',
      fullname: 'John Doe',
      cellphone: '1234567890'
    },
    {
      order_id: 2,
      total_price: 250,
      created_at: new Date('2023-10-25T09:15:00'),
      updated_at: new Date('2023-10-29T11:45:00'),
      estimated_for: new Date('2023-11-03T14:30:00'),
      detail: 'Sample detail 2',
      last_state_change_at: new Date('2023-10-29T11:45:00'),
      state: 'In Progress',
      email: 'client2@example.com',
      fullname: 'Jane Smith',
      cellphone: '9876543210'
    },
    {
      order_id: 3,
      total_price: 75,
      created_at: new Date('2023-10-20T14:00:00'),
      updated_at: new Date('2023-10-27T16:10:00'),
      estimated_for: new Date('2023-11-02T09:00:00'),
      detail: 'Sample detail 3',
      last_state_change_at: new Date('2023-10-27T16:10:00'),
      state: 'Completed',
      email: 'client3@example.com',
      fullname: 'Michael Johnson',
      cellphone: '5551234567'
    },
    {
      order_id: 4,
      total_price: 300,
      created_at: new Date('2023-10-15T11:00:00'),
      updated_at: new Date('2023-10-25T13:20:00'),
      estimated_for: new Date('2023-11-08T16:00:00'),
      detail: 'Sample detail 4',
      last_state_change_at: new Date('2023-10-25T13:20:00'),
      state: 'Shipped',
      email: 'client4@example.com',
      fullname: 'Emily Brown',
      cellphone: '4445556666'
    },
    {
      order_id: 5,
      total_price: 150,
      created_at: new Date('2023-10-18T13:30:00'),
      updated_at: new Date('2023-10-29T10:45:00'),
      estimated_for: new Date('2023-11-04T11:30:00'),
      detail: 'Sample detail 5',
      last_state_change_at: new Date('2023-10-29T10:45:00'),
      state: 'Delivered',
      email: 'client5@example.com',
      fullname: 'William Johnson',
      cellphone: '7778889999'
    },
    {
      order_id: 6,
      total_price: 200,
      created_at: new Date('2023-10-22T12:45:00'),
      updated_at: new Date('2023-10-28T14:20:00'),
      estimated_for: new Date('2023-11-01T13:00:00'),
      detail: 'Sample detail 6',
      last_state_change_at: new Date('2023-10-28T14:20:00'),
      state: 'Pending',
      email: 'client6@example.com',
      fullname: 'Sophia Davis',
      cellphone: '1112223333'
    },
    {
      order_id: 7,
      total_price: 180,
      created_at: new Date('2023-10-19T09:00:00'),
      updated_at: new Date('2023-10-26T11:30:00'),
      estimated_for: new Date('2023-11-03T10:00:00'),
      detail: 'Sample detail 7',
      last_state_change_at: new Date('2023-10-26T11:30:00'),
      state: 'In Progress',
      email: 'client7@example.com',
      fullname: 'Oliver Wilson',
      cellphone: '6667778888'
    },
    {
      order_id: 8,
      total_price: 120,
      created_at: new Date('2023-10-24T15:15:00'),
      updated_at: new Date('2023-10-31T09:40:00'),
      estimated_for: new Date('2023-11-06T15:30:00'),
      detail: 'Sample detail 8',
      last_state_change_at: new Date('2023-10-31T09:40:00'),
      state: 'Completed',
      email: 'client8@example.com',
      fullname: 'Emma Taylor',
      cellphone: '9990001111'
    },
    {
      order_id: 9,
      total_price: 220,
      created_at: new Date('2023-10-23T16:30:00'),
      updated_at: new Date('2023-10-30T12:15:00'),
      estimated_for: new Date('2023-11-05T16:30:00'),
      detail: 'Sample detail 9',
      last_state_change_at: new Date('2023-10-30T12:15:00'),
      state: 'Shipped',
      email: 'client9@example.com',
      fullname: 'Liam Anderson',
      cellphone: '2223334444'
    },
    {
      order_id: 10,
      total_price: 80,
      created_at: new Date('2023-10-26T10:00:00'),
      updated_at: new Date('2023-11-01T14:10:00'),
      estimated_for: new Date('2023-11-04T10:30:00'),
      detail: 'Sample detail 10',
      last_state_change_at: new Date('2023-11-01T14:10:00'),
      state: 'Delivered',
      email: 'client10@example.com',
      fullname: 'Ava Martinez',
      cellphone: '3334445555'
    }
 
]
const data = {
    found:true,
    orders: orders
}

export default data