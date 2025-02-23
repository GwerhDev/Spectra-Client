import { $d } from "."

export function reset() {
  $d('#slideCanvasCont').style.overflowY = 'hidden';
  $d('.canvas-menu-container').style.display = 'none';
};