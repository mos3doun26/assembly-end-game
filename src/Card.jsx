export default function Card({ text, status, sub }) {
    const cardStyle = status === 'wrong-guess' ? "wrong-guess-card" : status === 'win' ? 'win-card' : 'game-over-card'


    return (
        <div className={`card ${cardStyle}`}>
            {text}
            {sub && <span className="sub-text">{sub}</span>}
        </div>

    )
}