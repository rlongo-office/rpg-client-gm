import { useAppContext } from '@context/app-provider'
import {useEffect,useState} from 'react'
import ChatMessage from './chat-message'
import * as rpgTypes from '../../types/rpg-types'

function ChatHistory() {
  const { textHistory,myUser } = useAppContext()
  const [myTextHistory,setMyTextHistory] = useState<rpgTypes.TextMessage[]>(textHistory)

  useEffect(() => {
    const myUpdatedTexts = textHistory.filter(msg =>
      msg.sender === myUser ||  //display msgs I sent...
      msg.sender === 'game' ||  //...those from the game...
      msg.dest.includes(myUser) ||  //..where i was included in the recipients list
      msg.dest === 'party' || //...or they were destined for the party...
      msg.dest === 'all'      //...or everyone
    );
  
    setMyTextHistory(myUpdatedTexts);
  }, [textHistory]);

  return (
    <div style={{ borderColor: 'blue', overflowY: 'auto', height: '200px', width: '370px' }}>
      {textHistory.map((row: any, rowIndex: number) => (
        <div id={`row-id-${rowIndex}`} key={`row-key-${rowIndex}`}>
          <ChatMessage {...row} />
        </div>
      ))}
    </div>
  )
}

export default ChatHistory
