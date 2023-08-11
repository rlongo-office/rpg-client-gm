import CollapsibleTree from '@components/UI/data-tree';
import React, { useState } from 'react';

export interface AnyObject {
    [key: string]: any
  }


const UITestPage: React.FC = () => {
    const [data, setData] = useState<AnyObject>({
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'New York',
          zip: '10001',
        },
      });

      const handleDataChange = (updatedData: AnyObject) => {
        setData((prevData) => {
          const mergedData = {
            ...prevData,
            ...updatedData,
          };
          return JSON.parse(JSON.stringify(mergedData, null, 2));
        });
      };

  return (
    <div>
      <CollapsibleTree data={data} onChange={handleDataChange} />
    </div>
  );
};

export default UITestPage;