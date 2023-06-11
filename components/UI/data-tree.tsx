import React, { useState, useEffect, useRef } from 'react';

interface CollapsibleTreeProps {
  data: object;
  onChange: (updatedData: object) => void;
}

interface TreeNodeProps {
  data: object;
  path: string[];
  onChange: (path: string[], value: string | number) => void;
  inputRefs: { [path: string]: React.RefObject<HTMLInputElement> };
}

const TreeNode: React.FC<TreeNodeProps> = ({ data, path, onChange, inputRefs }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(path, value);
  };

  if (typeof data !== 'object' || data === null) {
    return (
      <div>
        <input
          ref={inputRefs[path.join('.')]}
          type="text"
          defaultValue={String(data)}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div>
      <div onClick={toggleCollapse} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {collapsed ? '▶' : '▼'} {path[path.length - 1]}
      </div>
      {!collapsed && (
        <div style={{ marginLeft: '20px' }}>
          {Object.entries(data).map(([key, value]) => (
            <TreeNode
              key={key}
              data={value}
              path={[...path, key]}
              onChange={onChange}
              inputRefs={inputRefs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CollapsibleTree: React.FC<CollapsibleTreeProps> = ({ data, onChange }) => {
  const [treeData, setTreeData] = useState<object>(data);
  const inputRefs = useRef<{ [path: string]: React.RefObject<HTMLInputElement> }>({});
  const emptyRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTreeData(data);
    updateInputRefs(data, []);
  }, [data]);

  const updateInputRefs = (data: any, path: string[]) => {
    if (typeof data !== 'object' || data === null) {
      inputRefs.current[path.join('.')] = inputRefs.current[path.join('.')] || emptyRef
    } else {
      Object.entries(data).forEach(([key, value]) => {
        updateInputRefs(value, [...path, key]);
      });
    }
  };

  const handleNodeChange = (path: string[], value: string | number) => {
    setTreeData((prevData) => {
      const updatedData = { ...prevData };
      let currentNode: any = updatedData;

      for (let i = 0; i < path.length - 1; i++) {
        currentNode = currentNode[path[i]];
      }

      currentNode[path[path.length - 1]] = value;

      return updatedData;
    });
  };

  const handleConfirm = () => {
    onChange(treeData);
  };

  return (
    <div>
      <TreeNode data={treeData} path={[]} onChange={handleNodeChange} inputRefs={inputRefs.current} />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default CollapsibleTree;