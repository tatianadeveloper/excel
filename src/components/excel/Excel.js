import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector);
    this.$el = $(selector);
    this.components = options.components||[];
  }

  getRoot() {
    // const $root = document.createElement('div');
    // $root.textContent = 'test2';
    // $root.style.fontSize = '5rem';
    // $root.classList.add('excel');

    const $root = $.create('div', 'excel');

    /* this.components.forEach((Component) => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      // debugger;
      // $el.innerHTML = component.toHTML();
      $root.append($el);
      // $root.insertAdjacentHTML('beforeend', component.toHTML());
    });
    */

    
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      /*
      // debug
      if (component.name) {
        window['c' + component.name] = component;
      }
      */
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    

    return $root;
  }

  render() {
    // console.log(this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', `<h1> Test </h1>`);
    // const node = document.createElement('h1');
    // node.textContent = 'test1';
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
    // console.log(this.components);
  }
}

