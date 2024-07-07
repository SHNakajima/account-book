import { useForm, usePage } from '@inertiajs/react';
import { Button, CardFooter, CardHeader, Input } from '@nextui-org/react';

export default function UpdateProfileInformationForm() {
  const { user } = usePage().props.auth;
  const { name } = user;

  const { data, setData, patch, errors, processing } = useForm({
    name,
  });

  const submitForm = e => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <div>
      <CardHeader className="text-lg font-semibold">ユーザー名変更</CardHeader>
      <form onSubmit={submitForm}>
        <Input
          label="ユーザー名"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          variant="bordered"
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />
        <CardFooter className="flex justify-end">
          <Button color="primary" type="submit" isLoading={processing}>
            保存
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
