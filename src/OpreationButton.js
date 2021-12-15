import { ACTION } from "./App"

export default function OpreationButton({ dispatch, opreation }) {
  return (
    <button onClick={() => dispatch({ type: ACTION.CHOOSE_OPREATION, payload: { opreation } })}>{opreation}</button>
  )
}
