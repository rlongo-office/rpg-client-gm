import { useRef, useEffect, useState, useCallback } from 'react'
import { useAppContext } from '@context/app-provider'
import * as types from '../../types/rpg-types'
import MultiSelect from '@components/UI/MultiSelectOld'
import { useAppEventContext } from '@context/app-event-provider'
import { getCurrentTimeString } from '@utils/utils'

function PlayerEditor() {
    const {gameState} = useAppContext()
    const {addToOutboundQueue} = useAppEventContext()
    const [selected,setSelected] = useState<string[]>([])
    const [players,setPlayers] = useState<string[]>([])
    const [objChange,setObjChange] = useState<types.Action>({type:"",payload:null,path:""})   //The path to the player Character object value that is changing
  
    useEffect(() => {
      setPlayers(gameState.players.map((p)=>p.name))
    }, [gameState])

  const sendUpdateMessage = () => {
    let msg: types.messageType = {
      id: 0.1,
      sender: 'GM',
      timeStamp: getCurrentTimeString(), //Add Linux epoch time here instead
      type: 'gameUpdate',
      data: "",           //Needs to be the value that has been changed
      dest: ["all"],            //Most game object changes will be sent to everyone
    }
    addToOutboundQueue(JSON.stringify(msg))
  }

  const handleMultiSelectChange = useCallback((selectedOptions: types.SelectionOption[]) => {
    const msgRecips = selectedOptions.map(option => option.value)
    setSelected(msgRecips)
  }, [])

/*   return (
    <div id="chat-client">
      <MultiSelect
        options={options}
        onChange={handleMultiSelectChange}
        width={150}
        toggleHeight={20}
        title="Choose Recipients"
        fontSize="12px"
        grow={true}
        parentClick={false}
        multiSelect={false}
      />
      <textarea
        style={{
          width: '100%',
          minHeight: '50px',
          resize: 'none',
        }}
        ref={msgRef}
      ></textarea>
      <button onClick={() => sendUpdateMessage()}>Commit</button>
    </div>
  ) */
  return <div></div>
}
export default PlayerEditor
