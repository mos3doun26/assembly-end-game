export default function Alphabet({ alp, handle }) {
    const bgColor = alp.status === 'normal' ? '#FCBA29' : alp.status === 'correct' ? '#10A95B' : '#EC5D49'

    return <button style={{ backgroundColor: bgColor }} className={`letter ${alp.disable && "disable"}`} onClick={() => handle(alp)}>{alp.val}</button>
}