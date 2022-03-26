import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PDF", "DOCX"];

function UploadFileForm() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    console.log(file);

    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
}

export default UploadFileForm;