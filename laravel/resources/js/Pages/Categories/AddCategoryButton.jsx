import Modal from '@/Components/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function AddCategoryButton({ className, categoryType }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const nameInput = useRef();
  const targetModelName = 'カテゴリ';

  const { data, setData, post, errors, processing, reset, clearErrors } =
    useForm({
      name: '',
      type: categoryType,
    });

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    clearErrors();
    reset();
  };

  const postCategory = e => {
    e.preventDefault();

    post(route('categories.create'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => nameInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  return (
    <button className="flex items-center mr-4 px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
      <PlusIcon className="h-6 w-4" onClick={openModal} />

      <Modal show={isOpenModal} onClose={closeModal}>
        <form onSubmit={postCategory} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">カテゴリ追加</h2>

          <div className="mt-6">
            <div className="flex justify-end items-center">
              <InputLabel
                htmlFor="name"
                value={`${targetModelName}名`}
                className="sr-only"
              />

              <TextInput
                id="name"
                type="name"
                name="name"
                ref={nameInput}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className="block w-2/3 h-8"
                required
                isFocused
                placeholder={`${targetModelName}名`}
              />
              <PrimaryButton className="ms-3" disabled={processing}>
                追加
              </PrimaryButton>
            </div>

            <InputError message={errors.name} className="mt-2 text-right" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
          </div>
        </form>
      </Modal>
    </button>
  );
}
