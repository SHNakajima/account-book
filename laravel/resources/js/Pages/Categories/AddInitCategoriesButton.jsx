import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function AddInitCategoriesButton({ className }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    categoryNum: 15,
  });

  const addInitCategories = e => {
    post(route('categories.init'));
  };

  return (
    <div onClick={addInitCategories}>
      <PrimaryButton>クリックで適当なカテゴリを追加</PrimaryButton>
    </div>
  );
}
