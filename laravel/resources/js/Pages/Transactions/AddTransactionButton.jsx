import { useState, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal'; // モーダルをインポート
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import useLiff from '@/hooks/useLiff';

export default function AddTransactionButton({ liff }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const nameInput = useRef();
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState([]);

  const openModal = () => {
    if (liff.error) {
      alert(liff.error);
    } else {
      setIsOpenModal(true);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleLogInputValue = () => {
    liff.sendMessage(inputValue);
  };

  return (
    <button className="flex items-center mr-8 px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
      <PlusIcon className="h-6 w-4" onClick={openModal} />

      <Modal show={isOpenModal} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">収支データ追加</h2>

          <div className="mt-6">
            <div className="flex justify-end items-center">
              <InputLabel
                htmlFor="name"
                value={`例) おにぎり２００えん`}
                className="sr-only"
              />

              <TextInput
                id="name"
                type="name"
                name="name"
                ref={nameInput}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="block w-2/3 h-8"
                required
                isFocused
                placeholder={`例) おにぎり２００えん`}
              />
              <PrimaryButton className="ms-3" onClick={handleLogInputValue}>
                追加
              </PrimaryButton>
            </div>

            <InputError message={errors.name} className="mt-2 text-right" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
          </div>
        </div>
      </Modal>
    </button>
  );
}
