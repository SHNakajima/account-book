import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
  Modal,
  Button,
  Input,
  Textarea,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function ModifyTransactionButton({
  className = '',
  patchRouteName,
  target,
  allCategories,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(target.category);

  const { data, setData, patch, processing, reset, errors } = useForm({
    id: target.id,
    description: target.description,
    categoryId: target.category.id,
    amount: target.amount,
  });

  useEffect(() => {
    if (isOpen) {
      initForm();
    }
  }, [isOpen]);

  const initForm = () => {
    console.log(target);
    console.log(allCategories);
    setData({
      id: target.id,
      description: target.description,
      categoryId: target.category.id,
      amount: target.amount,
    });
    setSelected(target.category);
  };

  const handleSubmit = e => {
    e.preventDefault();
    patch(route(patchRouteName), {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
    });
  };

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="light"
        onPress={() => setIsOpen(true)}
        className={className}
      >
        <PencilIcon className="h-5 w-5" />
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} placement="auto">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>収支データを編集</ModalHeader>
            <ModalBody>
              <Autocomplete
                label="カテゴリー選択"
                placeholder="カテゴリーを選択してください"
                isRequired
                defaultSelectedKey={selected.id.toString()}
                defaultItems={allCategories}
                onSelectionChange={keys => {
                  const selectedId = Array.from(keys)[0];
                  const selectedCategory = allCategories.find(
                    cat => cat.id.toString() === selectedId
                  );
                  setSelected(selectedCategory);
                  setData('categoryId', Number(selectedId));
                }}
              >
                {category => (
                  <AutocompleteItem key={category.id.toString()}>
                    {category.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Input
                label="金額"
                value={data.amount}
                onChange={e => setData('amount', e.target.value)}
                type="number"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-nowrap">
                      {selected.type === 'income' ? '+¥' : '-¥'}
                    </span>
                  </div>
                }
              />

              <Textarea
                label="メモ"
                placeholder="メモを入力"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
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
                <Button color="primary" type="submit" disabled={processing}>
                  更新
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
