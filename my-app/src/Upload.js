import React, { useState } from "react";
import axios from "axios";
import Answer from "./Answer";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [answer, setAnswer] = useState("");

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

    const askQuestion = async (inputQuestion) => {
        try {
            const response = await axios.post("/question", {
                question: inputQuestion,
                filename: file.name,
            });
            setAnswer(response.data.answer);
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

            <input type="text" onChange={(event) => askQuestion(event.target.value)} />
            <button onClick={() => askQuestion()}>Ask Question</button>

            <Answer answer={answer} />
        </div>
    );
};

export default Upload;
