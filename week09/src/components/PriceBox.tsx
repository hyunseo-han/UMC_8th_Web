import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";
import { FaTrash } from "react-icons/fa";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="bg-white rounded-lg p-6 flex items-center justify-between w-[90%] max-w-2xl">
        <div className="text-lg font-bold text-gray-800">
          총 가격{" "}
          <span className="text-blue-600">{total.toLocaleString()}원</span>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <FaTrash />
          장바구니 초기화
        </button>
      </div>
    </div>
  );
};

export default PriceBox;
