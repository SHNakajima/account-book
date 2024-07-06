import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import {
  Modal,
  Button,
  Card,
  ModalContent,
  CardBody,
  CardHeader,
  Divider,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteTransactionButton({
  className = '',
  deletionRouteName,
  target,
  targetModelName,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    delete: destroy,
    processing,
    reset,
  } = useForm({
    id: target.id,
  });

  const handleDelete = e => {
    e.preventDefault();
    destroy(route(deletionRouteName), {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
      onFinish: () => reset(),
    });
  };

  return (
    <>
      <Button
        isIconOnly
        color="danger"
        variant="light"
        onPress={() => setIsOpen(true)}
        className={className}
      >
        <TrashIcon className="h-5 w-5" />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="auto"
        classNames={{
          base: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
          header: 'border-b border-gray-200 dark:border-gray-700',
          body: 'py-6',
          closeButton: 'hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full',
        }}
      >
        <ModalContent>
          <ModalHeader>収支データを削除しますか？</ModalHeader>
          <form onSubmit={handleDelete}>
            <ModalBody>
              <Card>
                <CardBody>
                  <div className="space-y-3">
                    <DetailItem label="追加日" value={target.created_at_ymd} />
                    <DetailItem
                      label="カテゴリ"
                      value={target.category.display_name}
                    />
                    <DetailItem label="メモ" value={target.description} />
                    <DetailItem
                      label="金額"
                      value={target.amount_str}
                      isAmount
                    />
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="gray" onPress={() => setIsOpen(false)}>
                キャンセル
              </Button>
              <Button auto color="danger" type="submit" disabled={processing}>
                削除
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

function DetailItem({ label, value, isAmount = false }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${isAmount ? 'text-danger' : 'text-gray-900 dark:text-gray-100'}`}
      >
        {value}
      </span>
    </div>
  );
}
