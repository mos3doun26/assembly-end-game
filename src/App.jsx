import { useState } from 'react'
import './App.css'
import Language from './Language'
import languages from './languages'
import Letter from './Letter';

const alphabet = Array.from({ length: 26 }, (_, i) => {
  const letter = String.fromCharCode(65 + i); // 65 = 'A'
  return {
    val: letter,
    isClicked: false,
    status: "normal"
  };
});



function App() {


  return (
    <main className='container'>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the<br />programming world safe from Assembly!</p>
      <div className='card-holder'></div>
      <div className='languages-holder'>
        {languages.map(language => <Language language={language} />)}
      </div>
      <div className='word-guess'>
        <div className='letter'></div>
        <div className='letter'></div>
        <div className='letter'></div>
        <div className='letter'></div>
        <div className='letter'></div>
      </div>
      <div className='letters'>
        {alphabet.map(letter => <Letter letter={letter} />)}
      </div>

    </main>
  )
}

export default App
