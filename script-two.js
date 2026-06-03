function printInvoice(){
    window.print();
}

function downloadPDF() {
  const link = document.createElement('a');
  link.href = 'files/report.pdf'; // PDF URL
  link.download = 'report.pdf';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}