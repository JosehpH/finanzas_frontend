import jsPDF from "jspdf";

export function useExportFile(){
    const exportPdf = (col,data) => {
        const doc = new jsPDF();

        // Construir la tabla
        const tableRows = [];
        data.forEach((item) => {
            const rowData = col.map(col => item[col.field]);
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [col.map(col => col.header)],  // Encabezados de la tabla
            body: tableRows  // Cuerpo de la tabla
        });

        doc.save('documento.pdf');  // Guardar el documento PDF con un nombre específico
    };

    const exportExcel = (data) => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'data');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    return {exportPdf,exportExcel}
}