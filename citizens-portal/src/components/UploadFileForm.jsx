import {useContext} from "react";
import {FileUploader} from "react-drag-drop-files";
import {UseUploadFile} from "../hooks";
import {LoginContext} from "../contexts/LoginContext";
import Swal from "sweetalert2";
import {Alert} from "@mui/material";

const fileTypes = ["JPG", "PNG", "GIF", "PDF", "DOCX"];

function UploadFileForm() {
    const {citizen} = useContext(LoginContext);
    const [uploadDocument, response] = UseUploadFile(`/upload/${citizen.id}`, "documents");

    const onSuccessAuthentication = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documento cargado exitosamente',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const onErrorAuthentication = () => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrió un error al cargar el archivo',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const upload = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        uploadDocument(formData, onSuccessAuthentication, onErrorAuthentication);
    }

    const handleChange = (file) => {
        console.log(file);
        upload(file);
    };

    return (
        <div className="upload-image-container">
            <FileUploader
                label="Suba o arrastre el archivo que desea cargar"
                hoverTitle="Arrastre aquí"
                handleChange={handleChange}
                name="file"
                classes={"drop-area-customized"}
                types={fileTypes}
                maxSize={2}
            />
            {(response.error) && (
                <Alert severity="error">{`${response.error}`}</Alert>
            )}
        </div>
    );
}

export default UploadFileForm;