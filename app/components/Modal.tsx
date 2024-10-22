interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                {children}
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default Modal;
