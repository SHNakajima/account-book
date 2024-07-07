import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardBody, Spacer } from '@nextui-org/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout user={auth.user} pageTitle={'プロフィール'}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="relative p-4 sm:p-8">
            <Card>
              <CardBody>
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                />
              </CardBody>
            </Card>
            <Spacer y={4} />
            <Card>
              <CardBody>
                <DeleteUserForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
