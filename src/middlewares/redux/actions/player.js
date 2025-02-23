import { Player } from "../../../interfaces/Player";
import { SET_PLAYER } from "../../misc";

export function setPlayer(e) {
  return {
    type: SET_PLAYER,
    payload: e
  }
};

export function resetPlayer() {
  return {
    type: SET_PLAYER,
    payload: new Player(),
  }
};