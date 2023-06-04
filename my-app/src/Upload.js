import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [file, setFile] = useState(null);

    const submitFile = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("/upload", formData)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
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
