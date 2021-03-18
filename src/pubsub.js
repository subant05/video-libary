export function createPubSub(){
  const domNode = document.createElement("div")
  const subscriptions = {}

  return {
    subscribe:(evtName,handler)=>{
      if(typeof subscriptions[evtName] !== 'array')
        subscriptions[evtName] =[]

      subscriptions[evtName].push(handler)
      domNode.addEventListener(evtName,handler)

    },
    unsubscribe:(evt,handler)=>{
      subscriptions[evt].splice(subscriptions[evt].indexOf(handler), 1)
      domNode.removeEventListener(evtName,   subscriptions[evt][subscriptions[evt].indexOf(handler)] )

    },
    triggerEvent:(evtName,data)=>{
      const event = new Event(evtName)
      event.data = data
      domNode.dispatchEvent(event)
    }
  }
}