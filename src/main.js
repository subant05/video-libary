import * as EventHandlers from './event-handler'
import {createPubSub} from './pubsub'

function initVideo(videoUrl){
  video =  window.document.createElement("video")
  video.src = videoUrl
  video.controls=true
  return video
}

function addVideoHandlers(video, pubSub){
  video.addEventListener("videoready",e=>EventHandlers.onVideoReady(e,pubSub.triggerEvent),false)
  video.addEventListener("play",e=>EventHandlers.onPlay(e,pubSub.triggerEvent),false)
  video.addEventListener("pause",e=>EventHandlers.onPause.bind(e,pubSub.triggerEvent),false)
  video.addEventListener("playing",e=>EventHandlers.onPlaying.bind(e,pubSub.triggerEvent),false)
  video.addEventListener("timeupdate",e=>EventHandlers.onTimeupdate(e,pubSub.triggerEvent),false)
  pubSub.subscribe("playVideo",e=>video.play())
  pubSub.subscribe("pauseVideo",e=>video.pause())
  return video
}


function acVideo(videoUrl="", node){
  if(typeof videoUrl !== "string" )
    throw new Error("A string of a url must be used in the constructor argument")

  const pubSub = createPubSub()
  const video = addVideoHandlers(initVideo(videoUrl),pubSub)

  node.appendChild( Object.freeze(video) )

  return {
      subscribe(eventName,eventHandler){pubSub.subscribe(eventName,eventHandler); return this},
      unsubscribe(eventName,eventHandler){pubSub.unsubscribe(eventName,eventHandler); return this},      
      hideControls(){video.controls=false; return this},
      showControls(){video.controls=true; return this},
      play(){
        pubSub.triggerEvent("playVideo")
        return this
      },
      pause(){
        pubSub.triggerEvent("pauseVideo")
        return this
      },

    }
}

window.acVideo = acVideo