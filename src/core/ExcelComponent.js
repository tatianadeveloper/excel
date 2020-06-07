import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options ={}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
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

  // add dom listeners
  init() {
    this.initDomListeners();
  }

  // destroy component, clean listeners
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
