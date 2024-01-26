import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ lineRedirectUrl }) {
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="container mt-12 flex items-center">
                <a href={lineRedirectUrl} className='max-h-fit max-w-fit hover:opacity-70'>
                    <img className='h-11' src="/images/line/btn_login_base.png" alt="line login button" />
                </a>
            </div>
        </GuestLayout>
    );
}
