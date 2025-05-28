import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const { isOpen } = useModalInfo();
  const { closeModal } = useModalActions();
  const { clearCart } = useCartActions();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[320px] text-center">
        <p className="text-lg font-semibold text-gray-800 mb-6">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCloseModal}
            className="px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
          >
            아니요
          </button>
          <button
            onClick={handleClearCart}
            className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
