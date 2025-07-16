export default function SingleInput() {

    return (
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
            className={`letterbox ${boxColours?.[2] || ''}`} />
    )
}