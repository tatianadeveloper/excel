export class Emitter {
  constructor() {
    this.listeners = {};
  }
    
  // dispatch, fire, trigger
  // notification listeners
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    } this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }
    
  // on, listen
  // subscibe on notifications, add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () =>{
      this.listeners[event] =
          this.listeners[event].filter((listener) => listener !==fn);
    };
  }
}


// example
/*
const emitter = new Emitter();
const unsub = emitter.subscribe('test1', (data) => console.log('sub: ', data));
emitter.emit('test1', 42);

setTimeout(() => {
  emitter.emit('test1', 'after 2 seconds');
}, 2000);

setTimeout(() => {
  unsub();
}, 3000);

setTimeout(() => {
  emitter.emit('test1', 'after 4 seconds');
}, 4000);
*/
