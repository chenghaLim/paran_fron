"use client"
import { useState } from "react";
import Alert from "../common/Alert";

export default function UpReview() {
    const [message, setMessages] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const upload = () => {

    }

    const onSubmitEvent = () => {
        setMessages('작성이 완료되었습니다.')
        setIsOpen(true);
        <Alert message={message} isOpen={isOpen} onClose={() => {}}/>
    }

    return (
        <div className="max-w-lg mx-auto my-20">
            <form className="" onSubmit={upload}>
                <div>
                    <label htmlFor="review">후기를 남겨주세요~</label>
                    <textarea id="review"></textarea>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">파일을 업로드해주세요</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="multiple_files" type="file" />
                </div>
                <button type="submit" onClick={onSubmitEvent}>후기작성</button>
            </form>
        </div>
    );
}