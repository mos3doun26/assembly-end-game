export default function LetterInGuess({ letter }) {

    return <div className="letter" style={{ color: letter.visible && !letter.isGuessed && "#EC5D49" }}>{letter.visible ? letter.val : ''}</div>
}