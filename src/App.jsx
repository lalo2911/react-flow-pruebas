import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FlowWithSidebar from './components/FlowWithSidebar';

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowWithSidebar />
    </ReactFlowProvider>
  );
};

export default App;
