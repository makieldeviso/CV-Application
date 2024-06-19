import { PrintIcon } from "./Icons";


const PrintBtn = function () {

  const handlePrintCV = function () {
    
    const root = document.querySelector('#root');
    root.classList.add('print');
    
    window.print();

    root.classList.remove('print');
  }

  return (
    <button 
      type = 'button' 
      className = "print-btn" 
      onClick = {handlePrintCV} 
      aria-label = "Print CV"
    >
      <PrintIcon/>
      Print
    </button>
  )
}

export default PrintBtn