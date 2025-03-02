import { $d } from ".";

export function CanvasMenuFunction(isOpen, setIsOpen) {
  document.addEventListener('mouseup', function (e) {
    var container = $d('.canvas-menu-container');
    if (!container?.contains(e.target) && isOpen) return (
      setIsOpen(false),
      $d('.canvas-menu-container').style.display = 'none'
    );
    return;
  });
};
