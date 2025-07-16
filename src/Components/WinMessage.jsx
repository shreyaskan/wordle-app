export default function WinMessage({ handleRestart }) {
    return (
        <dialog open className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around bg-[whitesmoke] text-[#08b408] w-[15rem] h-[8rem] text-xl border-2 border-black rounded-xl shadow-[0_5px_10px_rgba(0,0,0,1)]" onClose={handleRestart}>
            YOU WON!
            <form method="dialog" className='text-center'>
                <button onClick={handleRestart} className='bg-[whitesmoke] text-[black] text-center w-45 h-10 rounded-xl shadow-[0_5px_10px_rgba(0,0,0,1)]'>PLAY AGAIN</button>
            </form>
        </dialog>
    )
}