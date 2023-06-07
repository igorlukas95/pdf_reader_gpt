import React from "react";

const Answer = ({ answer }) => {
    return (
        <div>
            {answer && (
                <div>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default Answer;