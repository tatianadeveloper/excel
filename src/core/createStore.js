export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe: function(fn) {
      listeners.push(fn);
      /* return () => {
        listeners = listeners.filter((l) => l !== fn);
      };*/
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => {
            return listener !== fn;
          });
        },
            
      };
    },
    dispatch(action) {
      // action has key type
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}
