// eslint-disable-next-line require-jsdoc
import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    // console.log(this.listeners);
    this.listeners.forEach((listener) => {
      // console.log(listener);
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
            `method ${method} is not implemented in ${name} Component`);
      }
      // console.log('test ', this[method]);
      // the same as addEventListener
      // we lost context
      // this.$root.on(listener, this[method]);
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach( (listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
      // this.$root.off(listener);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
