import {rootReducer} from '@/redux/rootReducer';

export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.listeners = [];
    this.state = rootReducer({...initialState}, {type: '__INIT__'});
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners.filter((listener) => listener !== fn);
    };
  }

  dispatch(action) {
    this.state = rootReducer(action);
    this.listeners.forEach((listener) => listener(state));
  }

  getState() {
    return this.state;
  }
}
