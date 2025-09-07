import died from "./assets/died.png"

export default function Language({ language }) {
    const langStyle = {
        backgroundColor: language.backgroundColor,
        color: language.textColor
    }
    return (
        <div className="language" style={langStyle}>
            {language.name}
            {language.isDied && <div className="died-lang"><img src={died} /></div>}
        </div>
    )
}