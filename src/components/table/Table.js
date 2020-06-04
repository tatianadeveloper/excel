import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/Resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  // test;

  constructor($root) {
    super($root, {
      // listeners: [, 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown', 'mouseup'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onMousemove(event) {

  }

  onMouseup(event) {

  }

  toHTML() {
    return createTable();
  }
}
