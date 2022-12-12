export let MessageEventHandlers: Function[] = []

export enum handlerKey {
  privateText = 0,
  groupText,
  gameText,
  imageExchange,
  statUpdate,
  gameUpdate,
  loreText,
}

/* Jason has recommended we move this into 'Service' for better efficiency and use */
MessageEventHandlers[handlerKey.privateText] = function (msg: any) {
  //inbound process of text message sent to multiple party members and GM
}
MessageEventHandlers[handlerKey.groupText] = function (msg: any) {
  //inbound process of text message sent to multiple party members and GM
}
MessageEventHandlers[handlerKey.gameText] = function (msg: any) {
  //inbound process of text message from 'game' entity for all to see
}
MessageEventHandlers[handlerKey.imageExchange] = function (msg: any) {}
MessageEventHandlers[handlerKey.statUpdate] = function (msg: any) {}

/*Any changes related to game object, which could include but not limited to
  environment changes, player locations, conditions in the environment, campaign
  updates, etc*/
MessageEventHandlers[handlerKey.gameUpdate] = function (msg: any) {
  //update game object in App Provider
}
