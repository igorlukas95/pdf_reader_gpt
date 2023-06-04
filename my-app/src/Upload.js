import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [file, setFile] = useState(null);

    const downloadFile = async (filename) => {
        try {
            const response = await axios.get(`/download/${filename}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitFile = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            downloadFile(file.name);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
            />
            <button onClick={submitFile}>Upload</button>
        </div>
    );
};

export default Upload;
