import "./NewPostPanel.css"

import { useRef, useState } from "react";
import { ImCross } from "react-icons/im";

import CustomButton from "../../../Components/CustomButton/CustomButton";
import Post from "../../HomePage/Post/Post.jsx"
import { useNavigate } from "react-router-dom";











const FilePreview = ({ fileData, onRemove }) => {
    const { file, type } = fileData;

    return (
        <div className="file-preview">
            {type === 'image' && <img src={URL.createObjectURL(file)} alt="Preview" />}
            {type === 'video' && <video controls src={URL.createObjectURL(file)} />}
            {type === 'audio' && <audio controls src={URL.createObjectURL(file)} />}
            <div className="remove-file-svg" onClick={onRemove}><ImCross /></div>
        </div>
    );
};

const NewPostPanel = () => {
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    const fileInputRef = useRef(null)
    
    const [files, setFiles] = useState([]);
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const [plan, setPlan] = useState('basico')

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileType = file.type;
        let type = null;

        if (fileType.startsWith('image/')) type = 'image';
        else if (fileType.startsWith('video/mp4')) type = 'video';
        else if (fileType.startsWith('audio/')) type = 'audio';

        if (!type) {
            alert('Solo se permiten archivos de imagen, video MP4 o audio.');

            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpia el input
            }
            return;
        }

        setFiles([...files, { file, type }]);

        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Limpia el input
        }
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const formData = new FormData();
        formData.append('body', body);
        formData.append('plan', plan);
        formData.append('author', author);
      
        // Agregar archivos si existen
       if(files.length > 0)  files.forEach((file) => formData.append('media', file.file));


        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/posts/new-post`, {
            method: "POST",
            body: formData
        })
        .catch(error => {
            setProcessing(false)
            console.log(error)
        })

        if(!response.ok) {
            console.log(response)
            setProcessing(false)
            return alert("algo salió mal")
        }
        alert('todo salió bien')
        setProcessing(false)
        navigate('/admin/dashboard')
    }

    return (
        <div className="new-post-panel">
            <h2>Nuevo anuncio</h2>
            <form className="new-post-form" onSubmit={handleSubmit}>
                <div className="new-post-form-1">
                <label>Autor <input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>

                <label for="dropdown">Selecciona una nivel
                <select id="dropdown" name="dropdown" onChange={e => setPlan(e.target.value)} value={plan}>
                    <option value="basico">Básico</option>
                    <option value="estandar">Estándar</option>
                    <option value="vip">VIP</option>
                    
                </select>
                </label>
                </div>
                <label>Cuerpo</label>
                <textarea 
                placeholder="Escribe el cuerpo del anuncio aquí..." 
                value={body} 
                onChange={e => setBody(e.target.value)} 
                />
                <label className="add-file-label" htmlFor='file'>Subir archivo</label>
                <input 
                className="add-file-input" 
                id="file" 
                type="file" 
                onChange={handleFile} ref={fileInputRef} 
                />
            <div className="files-preview-container">
                {files.map((fileData, index) => (
                    <FilePreview key={index} fileData={fileData} onRemove={() => removeFile(index)} />
                ))}
            </div>

            <CustomButton type='submit' className={"submit-btn"} animationType="verticalScale">Subir</CustomButton>
                </form>
        </div>
    );
};

export default NewPostPanel;
