export function onVideoReady(e,triggerEvent){
  triggerEvent("playerReady",{fireEvent: triggerEvent});
}

export function onPlay(e, triggerEvent){
  triggerEvent("playerStarted",{fireEvent: triggerEvent});
}

export function onPause(e, triggerEvent){
  triggerEvent("playerPaused",{fireEvent: triggerEvent});
}

export function onTimeupdate(e, triggerEvent){
  triggerEvent("playerProgress:" ,e.target.currentTime)

  if( (e.target.duration.toFixed(0) / 2).toFixed() ===  e.target.currentTime.toFixed(0))
    triggerEvent("50percent",{fireEvent: triggerEvent})
}

export function onPlaying(e, triggerEvent){
  pubSub.triggerEvent("playerPlaying",{fireEvent: triggerEvent});
}
