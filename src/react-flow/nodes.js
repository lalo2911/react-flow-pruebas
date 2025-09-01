export const initialNodes = [
    {
        id: '1',
        type: 'input',
        position: { x: 100, y: 0 },
        data: { label: '1' },
        style: { backgroundColor: '#296e38', color: 'white' },
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: '2' },
        style: { backgroundColor: '#68296e', color: 'white' },
    },
    {
        id: '3',
        type: 'output',
        position: { x: 0, y: 200 },
        data: { label: '3' },
        style: { backgroundColor: '#6e2938', color: 'white' },
    },
    {
        id: '4',
        type: 'output',
        position: { x: 200, y: 200 },
        data: { label: '4' },
        style: { backgroundColor: '#6d6e29', color: 'white' },
    },
    {
        id: '5',
        type: 'keywords',
        position: { x: 0, y: 300 },
    },
    {
        id: '6',
        type: 'textInput',
        position: { x: 300, y: 300 },
        data: { text: '' },
    },
    {
        id: '7',
        type: 'view',
        position: { x: 600, y: 300 },
        data: { connectedNodes: [] },
    },
];
