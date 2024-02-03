import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteCategoryButton({ className = '', deletionRouteName, target, targetModelName }) {
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
        <button className={`text-red-500 hover:text-red-700 ${className}`}>
            <TrashIcon onClick={confirmDeletion} className="h-5 w-5" />

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {targetModelName}「{target.name}」を削除してもよろしいですか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        {targetModelName}を削除すると、このカテゴリに紐づく収支データが「未分類」になります。{targetModelName}を永久に削除することを確認するには、{targetModelName}名を入力してください。
                    </p>

                    <div className="mt-6">

                        <div className="flex justify-end items-center">
                            <InputLabel htmlFor="name" value={`${targetModelName}名`} className="sr-only" />

                            <TextInput
                                id="name"
                                type="name"
                                name="name"
                                ref={nameInput}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-2/3 h-8"
                                isFocused
                                placeholder={`${targetModelName}名`}
                            />
                            <DangerButton className="ms-3" disabled={processing}>
                                {targetModelName}を削除
                            </DangerButton>
                        </div>

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </button>
    );
}
