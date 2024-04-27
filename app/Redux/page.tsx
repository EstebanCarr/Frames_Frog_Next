"use client"
import {useAppDispatch,useAppSelector} from "@/redux/hooks";

export default function page() {
    const Contador = useAppDispatch(state =>state.counterReducer.counter)
  return (
    <div>
        <h1>
        {Contador} 
        </h1>
        <button>
            increment
        </button>
        <br />
        <button>
            decrement 
        </button>
    </div>
  )
}
