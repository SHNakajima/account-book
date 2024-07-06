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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} placement="auto">
        <ModalContent>
          <ModalHeader>{targetModelName}を削除</ModalHeader>
          <form onSubmit={handleDelete}>
            <ModalBody>
              <div>
                <DetailItem label="追加日" value={target.created_at_ymd} />
                <DetailItem
                  label="カテゴリ"
                  value={target.category.display_name}
                />
                <DetailItem label="メモ" value={target.description} />
                <DetailItem label="金額" value={target.amount_str} />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  color="gray"
                  variant="flat"
                  onPress={() => setIsOpen(false)}
                >
                  キャンセル
                </Button>
                <Button color="danger" type="submit" disabled={processing}>
                  削除
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

// 詳細項目用のヘルパーコンポーネント
function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
