import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react';
import { useRef, useState } from 'react';

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

  const deleteUser = e => {
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
    <div>
      <CardHeader className="text-lg font-medium ">アカウントの削除</CardHeader>
      <CardBody className="text-sm text-gray-600">
        アカウントを削除すると、すべてのリソースとデータが永久に削除されます。アカウントを削除する前に、保持したいデータや情報をダウンロードしてください。
      </CardBody>
      <CardFooter className="flex justify-end">
        <DangerButton onClick={confirmUserDeletion}>
          アカウントを削除
        </DangerButton>
      </CardFooter>

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

            <Input
              id="name"
              type="name"
              name="name"
              ref={nameInput}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              isFocused
              placeholder="ユーザー名"
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={closeModal} flat auto color="gray">
              キャンセル
            </Button>

            <Button className="ms-3" disabled={processing} auto color="danger">
              アカウントを削除
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
