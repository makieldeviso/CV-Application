import { PrintIcon } from "./Icons";


const PrintBtn = function () {

  const handlePrintCV = function () {
    // const screenWidth = window.screen.width;

    // if (screenWidth < 769) {
    //   alert('Print option ')
    //   return
    // }

    const root = document.querySelector('#root');
    root.classList.add('print');
    
    window.print();

    root.classList.remove('print');
  }

  return (
    <button type='button' className="print-btn" onClick={handlePrintCV} aria-label="Print CV">
      <PrintIcon/>
      Print
    </button>
  )
}

export default PrintBtn