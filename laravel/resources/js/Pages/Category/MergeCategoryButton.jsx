import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import DropDownHeadless from '@/Components/DropDownHeadless';
import Dropdown from '@/Components/Dropdown';

export default function MergeCategoryButton({ className = '', deletionRouteName, target, targetModelName, allCategories }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const nameInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        id: target.id,
        name: '',
    });

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route(deletionRouteName), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);

        reset();
    };

    return (
        <button className={`text-red-500 hover:text-red-700 text-center ${className}`}>
            <ArrowPathIcon onClick={confirmDeletion} className="h-5 w-5" />

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-base font-medium text-gray-900 mt-8">
                        付け替え先の{targetModelName}を選択してください。
                    </h2>

                    <div className="mt-2 flex justify-end">
                        {/* <DropDownHeadless items={allCategories} title="カテゴリー" className="w-5/12 border-black"/> */}

                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        付け替え先のカテゴリを選択してください
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
                                {Object.values(allCategories).map((item) => (
                                    <div  key={item.id} className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
                                        {item.name}
                                    </div>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                        <DangerButton className="ms-3" disabled={processing}>
                            に付け替え
                        </DangerButton>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </button>
    );
}
