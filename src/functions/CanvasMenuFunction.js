import { $d } from ".";

export function CanvasMenuFunction() {
    document.addEventListener('mouseup', function (e) {
        var container = $d('.canvas-menu-container');
        if (!container?.contains(e.target)) return $d('.canvas-menu-container').style.display='none';
        return;
    });
};
