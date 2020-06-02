import {ExcelComponent} from '@core/ExcelComponent';

// eslint-disable-next-line require-jsdoc
export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'click'],

      });
    }

    toHTML() {
      return `
      <div class="info"> fx </div>
            <div class="input" contenteditable></div>
`;
    }

    onInput(event) {
      // console.log(this.$root);
      console.log('Formula: onInput', event.target.textContent.trim());
    }

    onClick() {

    }

  /* init() {
      this.$root.on('input', function() {

      });
    }
    */
}
