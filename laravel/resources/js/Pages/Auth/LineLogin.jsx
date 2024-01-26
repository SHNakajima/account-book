import GuestLayout from "@/Layouts/GuestLayout";

export default function LineLogin({ lineRedirectUrl }) {
    return (
        <GuestLayout>
            <Head title="Log in" />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div>
                    <h1>Welcome to Our Website</h1>
                    <p>Please log in to continue.</p>
                    <a href={lineRedirectUrl}>Login</a>
                </div>
            </div>
        </GuestLayout>
    );
}
