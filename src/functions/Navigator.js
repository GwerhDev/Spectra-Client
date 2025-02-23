import { $d } from "."

export default function navBack(setPosNav, posNav) {
    if (window.pageYOffset>= 100) {
        setPosNav((window.scrollY-100)/100)
        $d('.nav-container').style.backgroundColor=`rgba(0, 0, 0, ${posNav})`
        $d('.nav-container').style.transitionDuration='.4'
    }
    else{
        $d('.nav-container').style.background="linear-gradient(to bottom, #010101cf, rgba(255, 255, 255, 0))"
        $d('.nav-container').style.transitionDuration='.4'
    }
}