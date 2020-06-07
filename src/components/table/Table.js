import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/Resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options = {}) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.unsubs = [];
  }

  toHTML() {
    return createTable(15);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0');
    this.selectCell($cell);

    /* const unsub = this.emitter.subscribe('it is working', (text) => {
      this.selection.current.text(text);
      console.log('Table from Formula: ', text);
    });
*/
    this.$on('formula: input', (text) => {
      this.selection.current.text(text);
      // console.log('Table from Formula: ', text);
    });

    this.$on('formula: enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        // this.selection.select($target);
        this.selectCell($target);
      }
    }
  }
  
  onKeydown(event) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      // const {col, row} = this.selection.current.id(true);
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      // this.selection.select($next);
      // this.$emit('table:select', $next);
      this.selectCell($next);
    }

    /*    const $current = this.selection.current;
        const $target = this.$root.find(
            `[data-id="${$current.row+1}:${$current.col}"]
              `);
        this.selection.select($target);
    }*/
  }

  // destroy() {
  // super.destroy();
  // this.unsubs.forEach((unsub) => unsub());
  //
  // }
  
  
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}


