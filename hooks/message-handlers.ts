import * as React from 'react'

export let messageEventHandlers: Function[] = []

export enum handlerKey {
  privateText=0,
  groupText,
  gameText,
  imageExchange,
  statUpdate,
  gameUpdate,
}

/* Jason has recommended we move this into 'Service' for better efficiency and use */
messageEventHandlers[handlerKey.privateText] = function (msg: any) {}
messageEventHandlers[handlerKey.groupText] = function (msg: any) {}
messageEventHandlers[handlerKey.gameText] = function (msg: any) {}
messageEventHandlers[handlerKey.imageExchange] = function (msg: any) {}
messageEventHandlers[handlerKey.statUpdate] = function (msg: any) {}
messageEventHandlers[handlerKey.gameUpdate] = function (msg: any) {}

