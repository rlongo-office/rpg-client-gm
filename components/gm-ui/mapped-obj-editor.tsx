import { GameObjectInputMap } from '@apptypes/rpg-types';
import { useAppContext } from '@context/app-provider';
import React, { useState, ChangeEvent } from 'react';

const gameObjectInputMap: GameObjectInputMap = {
    id: {
      type: 'text',
      required: true,
    },
    yearTime: {
      type: 'number',
      min: 0,
      max: 100,
      required: false,
    },
    time: {
      type: 'number',
      min: 0,
      max: 86400000, // Example values for milliseconds in a day
      required: true,
    },
    players: {
      type: 'dropdown',
      options: ['Player 1', 'Player 2', 'Player 3'],
      required: true,
    },
    campaign: {
      type: 'text',
      maxLength: 50,
      required: true,
    },
    channels: {
      type: 'dropdown',
      options: ['gm', 'bob', 'michael'],
      required: false,
    },
    climate: {
      type: 'text',
      required: true,
    },
  };

  interface GameObjectEditorProps {
    gameObject: any; // Update the type of gameObject accordingly
  }

  const MappedGameObjectEditor: React.FC = () => {
    const {game} = useAppContext()
    const [editedGameObject, setEditedGameObject] = useState(game);
    const handleInputChange = (key: string, value: any) => {
        const updatedObject = {
          ...editedGameObject,
          [key]: value,
        };
        console.log('Updated Object:', updatedObject); // Log the updated object
        setEditedGameObject(updatedObject);
      };
  
    const renderInput = (key: string, inputConfig: any, value: any) => {
      const { type, options } = inputConfig;
  
      switch (type) {
        case 'text':
        case 'number':
          return (
            <input
              type={type}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(key, e.target.value)}
            />
          );
        case 'dropdown':
          return (
            <select
              value={value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(key, e.target.value)}
            >
              {options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        default:
          return null;
      }
    };
  
    return (
      <div>
        <h2>Game Object Editor</h2>
        {Object.entries(gameObjectInputMap).map(([key, inputConfig]) => (
          <div key={key}>
            <label>{key}</label>
            {renderInput(key, inputConfig, editedGameObject[key])}
          </div>
        ))}
      </div>
    );
  };
  
  export default MappedGameObjectEditor;