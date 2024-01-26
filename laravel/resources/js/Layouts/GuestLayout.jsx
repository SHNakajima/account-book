import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">

            <div className='w-10/12 flex flex-col sm:justify-center items-center mb-10'>
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="min-w-full mt-6 px-6 py-4 min-h-fit overflow-hidden rounded-xl flex flex-col sm:justify-center items-center bg-white shadow-lg">
                    <div className='mt-3 ml-3 text-lg font-bold'>ようこそ！</div>
                    <div className='mt-3 ml-3'>あなたの家計簿を手助けします。</div>

                <div className='mt-5 mb-5'>
                    {children}
                </div>
                </div>
            </div>
        </div>
    );
}
