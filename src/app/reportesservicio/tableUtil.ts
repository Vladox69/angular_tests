export class TableUtil {
    static exportToPdf(tableId: string, name?: string) {
       let printContents, popupWin;
      printContents = document.getElementById(tableId).innerHTML;
      console.log(printContents)
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
    <html>
      <head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <title>Reportes</title>
       
      </head>
  <body
  onload="window.print();window.close()">
  <h1 style="text-align: center;">PROCESO COMPRAS PORTAL</h1>
  <table class="table table-dark" style="border: blue;">${printContents}</table>
  </body>
  <style type="text/css">
  h1{
	color: black;
	font-family: Arial, Helvetica, sans-serif;
	margin-left: 10px;
  }
  table,th,td{
    border-collapse: collapse;
    border: 1px solid black;
  }
  thead {
    background-color:darkgray;
    font-weight: bolder;
    border-color: black;
  }
</style>
    </html>`
      );
      popupWin.document.close();
    }
  }