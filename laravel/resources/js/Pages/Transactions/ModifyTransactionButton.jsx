import { PencilIcon } from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function ModifyTransactionButton({
  className = '',
  patchRouteName,
  target,
  allCategories,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(target.category);

  const { data, setData, patch, processing, reset, errors, clearErrors } =
    useForm({
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
    setData({
      id: target.id,
      description: target.description,
      categoryId: target.category.id,
      amount: target.amount,
    });
    setSelected(target.category);
    clearErrors();
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
                isInvalid={'categoryId' in errors}
                errorMessage={errors.categoryId}
                selectedKey={selected?.id.toString()}
                defaultItems={allCategories}
                onSelectionChange={key => {
                  const selectedCategory = allCategories.find(
                    cat => cat.id.toString() === key
                  );
                  setSelected(selectedCategory);
                  setData('categoryId', key ? Number(key) : null);
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
                isRequired
                value={data.amount}
                onChange={e => setData('amount', e.target.value)}
                type="number"
                isInvalid={'amount' in errors}
                errorMessage={errors.amount}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-nowrap">
                      {selected?.type === 'income' ? '+¥' : '-¥'}
                    </span>
                  </div>
                }
              />

              <Textarea
                label="メモ"
                placeholder="メモを入力"
                isRequired
                isInvalid={'description' in errors}
                errorMessage={errors.description}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button auto flat color="gray" onPress={() => setIsOpen(false)}>
                キャンセル
              </Button>
              <Button
                auto
                color="primary"
                type="submit"
                disabled={processing}
                isLoading={processing}
              >
                更新
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
