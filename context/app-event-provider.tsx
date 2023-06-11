import * as types from '../types/rpg-types'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAppContext } from '@context/app-provider'
import * as React from 'react'
import * as rpgTypes from '../types/rpg-types'
import { useRouter } from 'next/router'
import { sender2TextType } from '../utils/utils'

// TYPES
enum handlerKey {
  loginAck = 0,
  privateText,
  groupText,
  gameText,
  imageExchange,
  statUpdate,
  gameUpdate,
  loreText,
  textUpdate
}

export const AppEventContext = createContext<any | undefined>(undefined)

export function AppEventProvider({ children }: types.AppProviderProps) {
  const { game, setMyUser, setGame, myUser, users, setTextHistory, textHistory, appSocket, gameDispatch } = useAppContext()
  const router = useRouter();

  const inboundQueue = useMemo(() => [], []);
  const outboundQueue = useMemo(() => [], []);

  const addToInboundQueue = (message) => {
    console.log('Inbound message queued:' + message);
    inboundQueue.push(message);
  };

  const addToOutboundQueue = (message) => {
    console.log('Outbound message queued:' + message);
    outboundQueue.push(message);
  };

  const flushEvents =() => {
    processInboundMessages();
    sendOutboundMessages();
  };


  const processInboundMessages = () => {
    while (inboundQueue.length > 0) {
      const message = inboundQueue.shift();
      console.log('Inbound message processed:' + message);
      processInboundMessage(message);
    }
  };

  const sendOutboundMessages = () => {
    while (outboundQueue.length > 0) {
      const message = outboundQueue.shift();
      console.log('Outbound message processed:' + message);
      sendOutboundMessage(message);
    }
  };

  const init = () => {
    if (appSocket) {
      setInterval(() => {
        flushEvents();
      }, 250);
    } else {
      console.log('appSocket is not available');
    }
  };

  const emit = (message) => {
    addToOutboundQueue(message);
  };

  useEffect(() => {
    init();
  }, [appSocket]);


  useEffect(() => {
  }, [myUser, users, game, textHistory]);

  const MessageEventHandlers: Function[] = [];

  const sendOutboundMessage = 
    (outbound: string) => {
      //must be valid socket saved in app context and outbound cannot be blank
      if (appSocket){
        if (outbound.trim() !== "") {
          appSocket.send(outbound);
        } else
          console.log(`Empty message passed to sendOutboundMessage`);
      } else 
        console.log(`socket is not available`);
    }

  const processInboundMessage = (inbound: string): string | number => {
    if (inbound.trim() !== "") {
      const inMsg: types.messageType = JSON.parse(inbound);
      const inType: string = inMsg.type;
      debugger
      console.log(`Inbound type is  ${inType}`)
      return MessageEventHandlers[handlerKey[inType as keyof typeof handlerKey]](inbound);
    } else {
      console.log(`Empty message passed to processInboundMesage`);
    }
  };

  MessageEventHandlers[handlerKey.loginAck] = function (msg: string) {
    //acknowledgement from server after login
    //A log ack will have the game object as its data, we could call other handlers from here if needed
    const inMsg: types.messageType = JSON.parse(msg);
    const loginData: { user: string; password: string } = JSON.parse(inMsg.data);
    setMyUser(loginData.user); //on a loginAck the only recipient is the login use, so save it
    console.log(`Successfully logged into to the server as ${loginData.user}`);
    if (loginData.user !== "gm") {
      router.push(`/player-sheet`);
    } else {
      router.push(`/player-sheet`);
    }
    let gameUpdateMsg: types.messageType = {
      id: -1,
      sender: loginData.user,
      timeStamp: "",
      type: "gameUpdate",
      data: "gameUpdate",
      dest: ["server"],
    };
    addToOutboundQueue(JSON.stringify(gameUpdateMsg));

    let textUpdateMsg: types.messageType = {
      id: -1,
      sender: loginData.user,
      timeStamp: "",
      type: "textUpdate",
      data: "textUpdate",
      dest: ["server"],
    };
    addToOutboundQueue(JSON.stringify(textUpdateMsg));

    return true;
  };


  MessageEventHandlers[handlerKey.privateText] = function (msg: string) {
    return 1
  }

  MessageEventHandlers[handlerKey.groupText] = function (msg: string) {
    const msgObj = JSON.parse(msg)
    const textType = sender2TextType(msgObj.sender,users)
    const textMsg:rpgTypes.TextMessage = {
      id: msgObj.id,
      type: textType,
      timeStamp: msgObj.timeStamp,
      sender: msgObj.sender,
      text: msgObj.data,
      dest: msgObj.dest
    }
    console.log(textMsg)
    setTextHistory([...textHistory, textMsg])
    console.log(`Received msg: ${textMsg.text} from ${textMsg.sender}`)
    return 1
  }

  MessageEventHandlers[handlerKey.gameText] = function (msg: string) {
    return 1
  }

  MessageEventHandlers[handlerKey.imageExchange] = function (msg: string) {
    return 1
  }

  MessageEventHandlers[handlerKey.statUpdate] = function (msg: string) {
    return 1
  }

  MessageEventHandlers[handlerKey.gameUpdate] = function (msg: string) {
    console.log("Received GameUpdate message")
    gameDispatch({ type: 'UPDATE_GAME', payload: JSON.parse(JSON.parse(msg).data), path: '' });
    //setGame(JSON.parse(JSON.parse(msg).data))
    return 1
  }

  MessageEventHandlers[handlerKey.textUpdate] = function (msg: string) {
    console.log("Received text History message")
    gameDispatch({ type: 'UPDATE_TEXTS', payload: JSON.parse(JSON.parse(msg).data), path: '' });
    //setTextHistory(JSON.parse(JSON.parse(msg).data))
    return 1
  }

  const value = useMemo(() => ({
    addToInboundQueue,
    addToOutboundQueue
  }), [addToInboundQueue, addToOutboundQueue]);

  return <AppEventContext.Provider value={value}>{children}</AppEventContext.Provider>;
}

export function useAppEventContext() {
  const store = useContext(AppEventContext);
  if (!store) {
    throw new Error("Store is not defined");
  }
  return store;
}

export default { AppEventProvider, useAppEventContext };

