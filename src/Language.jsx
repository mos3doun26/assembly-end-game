export default function Language({ language }) {
    const langStyle = {
        backgroundColor: language.backgroundColor,
        color: language.textColor
    }
    return (
        <div className="language" style={langStyle}>{language.name}</div>
    )
}