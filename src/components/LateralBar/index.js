import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './LateralBar.css'

export default function LateralBar(params) {

    const printDocument = () => {
        const { print } = params
        print(true)
        var getFileName = prompt("Nombre del archivo?", "Presupuesto.pdf");
        if (getFileName === null) {
            return; //break out of the function early
        }
        const fileName = getFileName.split('.')
        const { input } = params
        html2canvas(input, {
            scale:2
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg')
            const pdf = new jsPDF('p', 'mm', 'a4')
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
            pdf.output('dataurlnewwindow')
            pdf.save(fileName[0]+".pdf")
            print(false)
        })
    }  

    return <header>
        <nav className="sidebar-navigation">
        <ul>
            <li className="active">
                <i className="fa fa-file"></i>
                <span className="tooltip">Nuevo</span>
            </li>
            <li>
                <i className="fa fa-save"></i>
                <span className="tooltip">Guardar</span>
            </li>
            <li>
                <i className="fa fa-print" onClick={printDocument}></i>
                <span className="tooltip">Imprimir</span>
            </li>
            <li>
                <i className="fa fa-sliders-h"></i>
                <span className="tooltip">Configuración</span>
            </li>
        </ul>
    </nav>
    </header>
}