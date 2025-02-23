import { $gId } from ".";

export function prevButton(currentPosition, setCurrentPosition, maxWidth, id) {
  setCurrentPosition(currentPosition -= 210);
  if (currentPosition <= 0) {
    setCurrentPosition(currentPosition = 0);
  }
  $gId(`item-list-${id}`).style.transform = `translateX(-${currentPosition}px)`;
}

export function nextButton(currentPosition, setCurrentPosition, maxWidth, id) {
  setCurrentPosition(currentPosition += 210);
  if (currentPosition >= maxWidth) {
    setCurrentPosition(currentPosition = 0);
  }
  $gId(`item-list-${id}`).style.transform = `translateX(-${currentPosition}px)`;
}