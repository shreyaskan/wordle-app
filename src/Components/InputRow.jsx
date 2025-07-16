import { useState, useRef } from 'react';

// certain words are invalid - the API endpoint isn't correct (eg. TOUCH)
// backspace 
// if a letter is green and that letter is repeated again later, the letter will show yellow, it should be grey

export default function InputRow({ wordleWord, externalFocusRef = null, inputRef = null, setWin, setLoss, isLastRow = false, setActiveRow, activeRow, rowIndex }) {

    const fallbackRef = useRef(null);
    const input1 = inputRef || fallbackRef;
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);
    const input5 = useRef(null);

    const [guess, setGuess] = useState('');
    const [boxColours, setBoxColours] = useState([]);

    const [wordCheck, setWordCheck] = useState(true);

    const isActiveRow = activeRow === rowIndex;

    function handleChange(e, nextInputBox) {
        const inputVal = e.target.value;

        if (inputVal.length === 1 && nextInputBox) {
            nextInputBox.current.focus();
        }
    }

    function handleBackspace(lastInputBox, currentBox) {
        currentBox.current.value = '';
        lastInputBox.current.focus();
    }

    async function isValidEnglishWord(word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.ok;
        } catch (error) {
            console.error('Error checking word:', error);
            return false;
        }
    }

    async function handleSubmit() {
        const lettersString = (input1.current.value + input2.current.value
            + input3.current.value + input4.current.value
            + input5.current.value).toString();

        setGuess(lettersString);

        const result = await isValidEnglishWord(lettersString);

        setWordCheck(result && lettersString.length === 5);

        if (result) {
            setActiveRow(prev => prev + 1);

            const newColours = []
            for (let i in lettersString) {
                if (lettersString[i] === wordleWord[i]) {
                    newColours.push('#b2ec5d'); //green
                }
                else {
                    if (wordleWord.includes(lettersString[i])) {
                        newColours.push('#ffd300'); //yellow

                    }
                    else {
                        newColours.push('#909090'); //grey
                    }
                }
            }
            setBoxColours(newColours);

            if (newColours.every(colour => colour === '#b2ec5d')) {
                setWin(true);
            }

            if (isLastRow && !newColours.every(colour => colour === '#b2ec5d')) {
                setLoss(true);
            }
        }

    }

    function nextRowSkip() {
        if (externalFocusRef && externalFocusRef.current) {
            externalFocusRef.current.focus();
        }
        externalFocusRef.current.focus();
    }

    return (
        <>
            <div className='inline-block'>
                <input
                    type='text'
                    maxLength={1}
                    disabled={!isActiveRow}
                    ref={input1}
                    onChange={(e) => handleChange(e, input2)}
                    className={`
                        rounded-xl w-[50px] h-[50px] mx-1 md:mx-2 my-4
                        text-center text-xl uppercase
                        ${boxColours?.[0] ? `bg-[${boxColours[0]}]` : "bg-[whitesmoke]"}
                      `}
                />
                <input
                    type='text'
                    maxLength={1}
                    disabled={!isActiveRow}
                    ref={input2}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            handleBackspace(input1, input2);
                        }
                    }}
                    onChange={(e) => handleChange(e, input3)}
                    className={`
                        rounded-xl w-[50px] h-[50px] mx-1 md:mx-2 my-4
                        text-center text-xl uppercase
                        ${boxColours?.[1] ? `bg-[${boxColours[1]}]` : "bg-[whitesmoke]"}
                      `} />

                <input
                    type='text'
                    maxLength={1}
                    disabled={!isActiveRow}
                    ref={input3}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            handleBackspace(input2, input3);
                        }
                    }}
                    onChange={(e) => handleChange(e, input4)}
                    className={`
                        rounded-xl w-[50px] h-[50px] mx-1 md:mx-2 my-4
                        text-center text-xl uppercase
                        ${boxColours?.[2] ? `bg-[${boxColours[2]}]` : "bg-[whitesmoke]"}
                      `} />

                <input
                    type='text'
                    maxLength={1}
                    disabled={!isActiveRow}
                    ref={input4}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            handleBackspace(input3, input4);
                        }
                    }}
                    onChange={(e) => handleChange(e, input5)}
                    className={`
                        rounded-xl w-[50px] h-[50px] mx-1 md:mx-2 my-4
                        text-center text-xl uppercase
                        ${boxColours?.[3] ? `bg-[${boxColours[3]}]` : "bg-[whitesmoke]"}
                      `} />

                <input
                    type='text'
                    maxLength={1}
                    disabled={!isActiveRow}
                    ref={input5}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                            if (wordCheck) {
                                setTimeout(nextRowSkip, 300);
                            }
                        }
                        if (e.key === 'Backspace') {
                            handleBackspace(input4, input5);
                        }
                    }}
                    onChange={(e) => handleChange(e, input5)}
                    className={`
                        rounded-xl w-[50px] h-[50px] mx-1 md:mx-2 my-4
                        text-center text-xl uppercase
                        ${boxColours?.[4] ? `bg-[${boxColours[4]}]` : "bg-[whitesmoke]"}
                      `} />
            </div>

            {!wordCheck && (
                <dialog open className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around bg-[whitesmoke] text-[#e23636] w-[15rem] h-[8rem] text-xl border-2 border-black rounded-xl shadow-[0_5px_10px_rgba(0,0,0,1)]" onClose={() => setWordCheck(true)}>
                    INVALID WORD
                    <form method="dialog" className='text-center'>
                        <button className='bg-[whitesmoke] text-center text-[black] w-25 h-10 rounded-xl shadow-[0_5px_10px_rgba(0,0,0,1)] ">'>RETRY</button>
                    </form>
                </dialog>
            )}
        </>
    )
}