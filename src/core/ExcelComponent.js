import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options ={}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];
    this.prepare();
    // this.storeSub = null;
  }

  // before init
  prepare() {

  }

  toHTML() {
    return '';
  }

  // notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  /* $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }
*/

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // add dom listeners
  init() {
    this.initDomListeners();
  }

  // destroy component, clean listeners
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    // this.storeSub.unsubscribe();
  }
}
