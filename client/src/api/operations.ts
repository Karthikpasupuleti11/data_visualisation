// Description: Get operations for a data structure
// Endpoint: GET /api/structures/:id/operations
// Request: { id: string }
// Response: { operations: Array<{ name: string, icon: string, description: string }> }
export const getOperations = (structureId: string) => {
  const operations = {
    '1': [ // Array
      { name: 'Insert', description: 'Add element at position', icon: 'plus' },
      { name: 'Delete', description: 'Remove element at position', icon: 'minus' },
      { name: 'Search', description: 'Find element in array', icon: 'search' }
    ],
    '2': [ // Linked List
      { name: 'Insert', description: 'Add node', icon: 'plus' },
      { name: 'Delete', description: 'Remove node', icon: 'minus' },
      { name: 'Traverse', description: 'Visit all nodes', icon: 'arrow-right' }
    ],
    '3': [ // Stack
      { name: 'Push', description: 'Add element to top', icon: 'arrow-up' },
      { name: 'Pop', description: 'Remove top element', icon: 'arrow-down' },
      { name: 'Peek', description: 'View top element', icon: 'eye' }
    ],
    '4': [ // Queue
      { name: 'Enqueue', description: 'Add element to rear', icon: 'plus' },
      { name: 'Dequeue', description: 'Remove front element', icon: 'minus' },
      { name: 'Front', description: 'View front element', icon: 'eye' }
    ],
    '5': [ // Tree
      { name: 'Insert', description: 'Add node', icon: 'plus' },
      { name: 'Delete', description: 'Remove node', icon: 'minus' },
      { name: 'Traverse', description: 'Visit all nodes', icon: 'arrows' }
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ operations: operations[structureId] || [] });
    }, 500);
  });
};