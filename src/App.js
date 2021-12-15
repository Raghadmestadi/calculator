import "./App.css"
import DigitButton from "./DigitButton"
import OpreationButton from "./OpreationButton"
import { useReducer } from "react"

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPREATION: "choose-opreation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTION.CHOOSE_OPREATION:
      if (state.currentOperand == null && state.perivousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          opreation: payload.opreation,
        }
      }
      if (state.perivousOperand == null) {
        return {
          ...state,
          opreation: payload.opreation,
          perivousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        perivousOperand: evaluate(state),
        opreation: payload.opreation,
        currentOperand: null,
      }
    case ACTION.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTION.CLEAR:
      return {}
    case ACTION.EVALUATE:
      if (state.opreation == null || state.perivousOperand == null || state.currentOperand == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        perivousOperand: null,
        opreation: null,
        currentOperand: evaluate(state),
      }
  }
}
function evaluate({ currentOperand, perivousOperand, opreation }) {
  const prev = parseFloat(perivousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (opreation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "÷":
      computation = prev / curr
      break
    case "*":
      computation = prev * curr
      break
  }
  return computation.toString()
}
const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  minimumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [intger, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATER.format(intger)
  return `${INTEGER_FORMATER.format(intger)}.${decimal}`
}
function App() {
  const [{ currentOperand, perivousOperand, opreation }, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-g">
      <div className="output">
        <div className="perivous">
          {formatOperand(perivousOperand)}
          {opreation}
        </div>
        <div className="current">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-2" onClick={() => dispatch({ type: ACTION.CLEAR })}>
        Ac
      </button>
      <button onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}>DEL</button>
      <OpreationButton opreation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OpreationButton opreation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OpreationButton opreation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OpreationButton opreation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-2" onClick={() => dispatch({ type: ACTION.EVALUATE })}>
        =
      </button>
    </div>
  )
}

export default App
