import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

export default function ModifyTransactionButton({
  className = '',
  patchRouteName,
  target,
  targetModelName,
  allCategories,
}) {
  const initSelectedText = target.category.display_name;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(target.category);
  const [selectedText, setSelectedText] = useState(initSelectedText);
  const targetInput = useRef();

  const { data, setData, patch, processing, reset, errors } = useForm({
    id: target.id,
    description: target.description,
    categoryId: target.category.id,
    amount: target.amount,
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const initForm = () => {
    setData({
      id: target.id,
      description: target.description,
      categoryId: target.category.id,
      amount: target.amount,
    });
    setSelected(target.category);
    setSelectedText(initSelectedText);
  };

  useEffect(() => {
    if (isOpen) {
      initForm();
    }
  }, [isOpen]);

  const deleteUser = e => {
    e.preventDefault();

    patch(route(patchRouteName), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => targetInput.current.focus(),
      // onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedText(initSelectedText);
    // reset();
  };

  const handleClick = e => {
    const t = e.target;
    setData('categoryId', Number(t.dataset.key));
    setSelectedText(t.textContent);

    const selected = allCategories.filter(i => i.id == t.dataset.key)[0];
    setSelected(selected);
  };

  return (
    <button
      className={`text-blue-500 hover:text-blue-700 text-center ${className}`}
    >
      <PencilIcon onClick={openModal} className="h-5 w-5" />

      <Modal show={isOpen} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-base font-medium text-gray-900 mt-2">
            支出データを編集
          </h2>

          <div className="ml-2">
            <div className="mt-2 flex justify-start items-center">
              <span className="w-1/4">カテゴリー</span>
              <span className="w-1/12 text-center">:</span>

              <div className="basis-auto">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        ref={targetInput}
                        id="mergeCategoryDropdown"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {selectedText}
                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    {Object.values(allCategories).map(item => (
                      <div
                        key={item.id}
                        data-key={item.id}
                        onClick={handleClick}
                        className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        {item.name}
                      </div>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
            <InputError message={errors.categoryId} className="mt-2" />

            <div className="mt-2 flex justify-start items-center">
              <span className="w-1/4">金額</span>
              <span className="w-1/12 text-center">:</span>
              <div className="basis-auto flex justify-start items-center">
                <span className="mr-2 text-bold ">
                  {selected.type == 'income' ? '+¥' : '-¥'}
                </span>
                <TextInput
                  id="amount"
                  className=" py-2 px-0"
                  value={data.amount}
                  onChange={e => setData('amount', e.target.value)}
                  required
                  isFocused
                  autoComplete="amount"
                />
              </div>
            </div>
            <InputError message={errors.amount} className="mt-2" />

            <div className="mt-2 flex justify-start items-start">
              <span className="w-1/4">メモ</span>
              <span className="w-1/12 text-center">:</span>
            </div>
            <TextArea
              id="description"
              className="mt-2 w-full h-16"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              required
              isFocused
              autoComplete="description"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          <InputError message={errors.id} className="mt-2" />

          <div className="mt-6 flex justify-end">
            <DangerButton className="ms-3" disabled={processing}>
              更新
            </DangerButton>
            <SecondaryButton onClick={closeModal} className="ml-4">
              キャンセル
            </SecondaryButton>
          </div>
        </form>
      </Modal>
    </button>
  );
}
