import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  // const $parent = $resizer.$el.parentNode;
  // const $parent = $resizer.$el.closest('.column');
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-100vmax',
  });

  document.onmousemove = (ev) => {
    if (type === 'row') {
      const delta = Math.floor(ev.pageY - coords.bottom);
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    } else {
      const delta = Math.floor(ev.pageX - coords.right);
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'row') {
      $parent.$el.style.height = `${value}px`;
    } else {
      const newwidth = `${value}px`;
      $parent.css({
        width: newwidth,
      });
      $root.findAll(
          `[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = newwidth);
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
