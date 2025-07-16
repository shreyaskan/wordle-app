import { useState, useRef } from "react";
import { generate } from "random-words";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faRefresh } from '@fortawesome/free-solid-svg-icons'
import InputRow from "./Components/InputRow";
import WinMessage from "./Components/WinMessage";
import LossMessage from "./Components/LossMessage";

export default function App() {

  const row2InputRef = useRef(null);
  const row3InputRef = useRef(null);
  const row4InputRef = useRef(null);
  const row5InputRef = useRef(null);

  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  const [activeRow, setActiveRow] = useState(1);
  const [firstPageFadeOut, setFirstPageFadeOut] = useState(false);
  const [wordleWord, setWordleWord] = useState("");

  function handlePlay() {
    setFirstPageFadeOut(true);
    setWordleWord(generate({ exactly: 1, minLength: 5, maxLength: 5 })[0]);
  }

  function handleRestart() {
    setFirstPageFadeOut(false);
    setWordleWord("");
    setWin(false);
    setActiveRow(1);
    setLoss(false);
  }

  return (
    <>
      <main className=" mb-0 bg-[linear-gradient(whitesmoke,black)] bg-cover flex flex-col items-center justify-evenly min-h-[100vh]">
        <div className='bg-[#2f3c7e] text-center rounded-2xl my-20 mx:0 md:mx-10 px-0 md:px-10 min-w-[80%] md:min-w-[50%] min-h-[80vh] flex flex-col justify-evenly  items-center hover:shadow-[0_10px_20px_rgba(0,0,0,1)] hover:duration-1000'>
          <h1 className="text-5xl mt-10">
            WORDLE
          </h1>
          <section>
            {!firstPageFadeOut && (
              <button onClick={handlePlay} className="bg-[black] text-[whitesmoke] text-center w-25 h-10 rounded-xl hover:shadow-[0_5px_10px_rgba(0,0,0,1)] hover:duration-500">
                Play
              </button>
            )}

            {firstPageFadeOut && (
              <div className="flex flex-col mt-8 ">
                <InputRow wordleWord={wordleWord} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={1} setLoss={setLoss} setWin={setWin} externalFocusRef={row2InputRef} />
                <InputRow wordleWord={wordleWord} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={2} setLoss={setLoss} setWin={setWin} inputRef={row2InputRef} externalFocusRef={row3InputRef} />
                <InputRow wordleWord={wordleWord} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={3} setLoss={setLoss} setWin={setWin} inputRef={row3InputRef} externalFocusRef={row4InputRef} />
                <InputRow wordleWord={wordleWord} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={4} setLoss={setLoss} setWin={setWin} inputRef={row4InputRef} externalFocusRef={row5InputRef} />
                <InputRow wordleWord={wordleWord} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={5} setLoss={setLoss} setWin={setWin} inputRef={row5InputRef} isLastRow />
              </div>
            )}
            {firstPageFadeOut && (
              <>
                <button onClick={handleRestart} className="bg-[black] text-[whitesmoke] text-center w-40 h-10 pl-0 pr-6 my-20 rounded-xl hover:shadow-[0_5px_10px_rgba(0,0,0,1)] hover:duration-500">
                  <FontAwesomeIcon icon={faRefresh} className='px-4' color="whitesmoke" />
                  Restart
                </button>
              </>
            )}
          </section>
          {win && <WinMessage handleRestart={handleRestart} />}
          {loss && <LossMessage wordleWord={wordleWord} handleRestart={handleRestart} />}
        </div>
      </main>
    </>
  )
}