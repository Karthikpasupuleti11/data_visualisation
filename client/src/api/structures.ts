import api from './api';

// Description: Get available data structures
// Endpoint: GET /api/structures
// Request: {}
// Response: { structures: Array<{ _id: string, name: string, description: string }> }
export const getDataStructures = async () => {
  // Use mock data during development
  return getMockDataStructures();
  // try {
  //   const response = await api.get('/api/structures');
  //   return response.data;
  // } catch (error: any) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get data structure details
// Endpoint: GET /api/structures/:id
// Request: { id: string }
// Response: { structure: { _id: string, name: string, description: string, operations: Array<{ name: string, description: string }> } }
export const getDataStructureDetails = async (id: string) => {
  // Use mock data during development
  return getMockDataStructureDetails(id);
  // try {
  //   const response = await api.get(`/api/structures/${id}`);
  //   return response.data;
  // } catch (error: any) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// For development, use these mock responses
export const getMockDataStructures = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        structures: [
          {
            _id: '1',
            name: 'Array',
            description: 'A collection of elements stored at contiguous memory locations',
          },
          {
            _id: '2',
            name: 'Linked List',
            description: 'A linear collection of elements where each element points to the next',
          },
          {
            _id: '3',
            name: 'Stack',
            description: 'A linear data structure that follows the LIFO principle',
          },
          {
            _id: '4',
            name: 'Queue',
            description: 'A linear data structure that follows the FIFO principle',
          },
          {
            _id: '5',
            name: 'Tree',
            description: 'A hierarchical data structure with a root value and subtrees of children',
          },
          {
            _id: '6',
            name: 'Graph',
            description: 'A non-linear data structure consisting of nodes and edges',
          },
        ],
      });
    }, 500);
  });
};

export const getMockDataStructureDetails = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        structure: {
          _id: id,
          name: 'Array',
          description: 'A collection of elements stored at contiguous memory locations',
          operations: [
            { name: 'Insert', description: 'Add an element at a given position' },
            { name: 'Delete', description: 'Remove an element at a given position' },
            { name: 'Search', description: 'Find an element in the array' },
          ],
        },
      });
    }, 500);
  });
};