import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function DeleteTransactionButton({ className = '', deletionRouteName, target, targetModelName }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        id: target.id,
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
        <button className="text-red-500 hover:text-blue-700 flex items-center">
            <TrashIcon onClick={confirmDeletion} className="h-5 w-5 mr-1" />
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {targetModelName}を削除してもよろしいですか？
                    </h2>

                    <div className="mt-6 ml-4">
                        <ul>
                            <li className='flex'>
                                <span className="font-bold basis-1/4 ">追加日</span>
                                <span className="basis-1/12">：</span>
                                <span className="basis-auto">{target.created_at_ymd}</span>
                            </li>
                            <li className='flex'>
                                <span className="font-bold basis-1/4 ">カテゴリ</span>
                                <span className="basis-1/12">：</span>
                                <span className="basis-auto">{target.category.display_name}</span>
                            </li>
                            <li className='flex'>
                                <span className="font-bold basis-1/4 ">メモ</span>
                                <span className="basis-1/12">：</span>
                                <span className="basis-auto">{target.description}</span>
                            </li>
                            <li className='flex'>
                                <span className="font-bold basis-1/4 ">金額</span>
                                <span className="basis-1/12">：</span>
                                <span className="basis-auto">{target.amount_str}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6">

                        <div className="flex justify-end items-center">
                            <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
                            <DangerButton className="ms-3" disabled={processing}>
                                削除
                            </DangerButton>
                        </div>

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                </form>
            </Modal>
        </button>

    );
}