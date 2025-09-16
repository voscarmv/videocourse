import Markdown from 'react-markdown'
import './App.css'

function App() {
  const markdown = '# Hi, *Pluto*!'

  return (
    <>
      <Markdown>{markdown}</Markdown>
    </>
  )
}

export default App
