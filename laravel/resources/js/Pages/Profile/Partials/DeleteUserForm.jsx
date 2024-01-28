import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const nameInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウントの削除</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アカウントを削除すると、すべてのリソースとデータが永久に削除されます。アカウントを削除する前に、保持したいデータや情報をダウンロードしてください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>アカウントを削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        アカウントを削除してもよろしいですか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントを削除すると、すべてのリソースとデータが永久に削除されます。アカウントを永久に削除することを確認するには、ユーザー名を入力してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="ユーザー名" className="sr-only" />

                        <TextInput
                            id="name"
                            type="name"
                            name="name"
                            ref={nameInput}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="ユーザー名"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            アカウントを削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
