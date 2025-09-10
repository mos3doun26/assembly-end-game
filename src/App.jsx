import { useEffect, useRef, useState } from 'react'
import { generate } from 'random-words'
import './App.css'
import Language from './Language'
import languages from './languages'
import Alphabet from './Alphabet';
import LetterInGuess from './LetterInGuess'
import Card from './Card'
import Confetti from 'react-confetti'

const getAlphabet = () => {
  return Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i); // 65 = 'A'
    return {
      id: i + 1,
      val: letter,
      isClicked: false,
      status: "normal",
      disable: false
    };
  })
}

function getRandomWord() {
  const randWord = generate().toUpperCase().split("")
  return randWord.map(letter => ({ val: letter, visible: false, isGuessed: false }))
}

function App() {
  const [word, setWord] = useState(() => getRandomWord())
  const [alphabet, setAlphabet] = useState(() => getAlphabet())
  const [langs, setLangs] = useState(languages)
  const [attempts, setAttempts] = useState(8)
  const [card, setCard] = useState(null)
  const newGameRef = useRef(null)

  const win = attempts > 0 && word.every(letter => letter.visible)
  const gameOver = attempts === 0

  useEffect(() => {
    if (gameOver || win) {
      setAlphabet(prevAlph => prevAlph.map(alph => ({ ...alph, disable: true })))
      newGameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      newGameRef.current.focus()
    }

    if (win) {
      setCard(<Card text={"You Win!"} sub={"Well done! 🎉"} status={"win"} />)
    }

    if (gameOver) {
      setWord(prevWord => prevWord.map(letter => !letter.isGuessed ? { ...letter, visible: true } : letter))
      setCard(<Card text={"Game Over "} sub={"You lose! Better start learning Assembly 😭"} status={"game-over"} />)
    }
  }, [gameOver, win])


  // return index of the lang will die
  function langToDie() {
    for (let i = 0; i < langs.length; i++) {
      if (!langs[i].isDied) {
        return i
      }
    }
  }

  function handleGuess(alphGuessed) {
    if (!alphGuessed.isClicked) {
      const isCorrect = word.some(letter => letter.val === alphGuessed.val)
      // first get the alphabet letter with same value of the guessed alphabet
      // second inside status of the alphabet with same value, work on status according to correct guess or not
      // and turn clicked to true

      if (!isCorrect) {
        setAttempts(attempts - 1)
      }

      setAlphabet(prevAlph => prevAlph.map(alph => {
        if (alph.val === alphGuessed.val) {
          return { ...alph, isClicked: true, status: isCorrect ? "correct" : "wrong" }
        }
        return alph
      }))

      if (isCorrect) {
        setWord(prevWord => prevWord.map(letter => letter.val === alphGuessed.val ? { ...letter, visible: true, isGuessed: true } : letter))
        setCard(null)
      } else {
        // logic of died language and perpel card previewing.
        const nextDie = langToDie()
        setLangs(prevLangs => prevLangs.map((lang, index) => index === nextDie ? { ...lang, isDied: true } : lang))
        setCard(<Card text={`"Farewell ${langs[nextDie].name}" 🫡`} status={'wrong-guess'} />)
      }
    }
  }


  function newGame() {
    setWord(() => getRandomWord())
    setAlphabet(() => getAlphabet())
    setLangs(languages)
    setAttempts(8)
    setCard(null)
    newGameRef.current.focus()
  }

  return (
    <main className='container'>
      {win && <Confetti />}
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the<br />programming world safe from Assembly!</p>
      <div className='card-holder'>{card}</div>
      <div className='languages-holder'>
        {langs.map((language, index) => <Language key={index} language={language} />)}
      </div>
      <div className='word-guess'>{word.map((letter, index) => <LetterInGuess key={index} letter={letter} />)}</div>
      <div className='letters'>
        {alphabet.map(alp => <Alphabet key={alp.id} alp={alp} handle={handleGuess} />)}
      </div>
      {win || gameOver ? <button className='new-game-btn' onClick={newGame} ref={newGameRef}>New Game</button> : ''}
    </main>
  )
}

export default App
