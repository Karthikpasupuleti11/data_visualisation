const mongoose = require('mongoose');

const structureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  operations: [{
    name: String,
    description: String
  }]
});

const mockData = [
  {
    _id: '1',
    name: 'Array',
    description: 'A collection of elements stored at contiguous memory locations',
    operations: [
      { name: 'Insert', description: 'Add an element at a given position' },
      { name: 'Delete', description: 'Remove an element at a given position' },
      { name: 'Search', description: 'Find an element in the array' }
    ]
  },
  {
    _id: '2',
    name: 'Linked List',
    description: 'A linear collection of elements where each element points to the next',
    operations: [
      { name: 'Insert', description: 'Add a new node' },
      { name: 'Delete', description: 'Remove a node' },
      { name: 'Traverse', description: 'Visit all nodes sequentially' }
    ]
  }
];

const Structure = mongoose.models.Structure || mongoose.model('Structure', structureSchema);
Structure.mockData = mockData;

module.exports = Structure;