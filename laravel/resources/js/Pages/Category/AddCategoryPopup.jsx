import { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

// カテゴリ追加ポップアップコンポーネント
export default function AddCategoryPopup({ closePopup, categoryType }) {
    const [categoryName, setCategoryName] = useState('');

    const { data, setData, post, errors, processing, recentlySuccessful, setDefaults } = useForm({
        name: categoryName,
        type: categoryType,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('category.create'));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div
                className="bg-white p-8 rounded-lg w-96 z-50"
                onClick={(e) => {
                    e.stopPropagation(); // ポップアップの外側クリックを無効にする
                }}
            >
                {/* <h2 className="text-xl font-semibold mb-4">カテゴリ追加</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="カテゴリ名" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="categoryName"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className='flex justify-end'>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>保存</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">保存されました。</p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </div>
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
                onClick={closePopup}
            ></div>
        </div>
    );
};