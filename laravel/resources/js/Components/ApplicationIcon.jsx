export default function ApplicationIcon({ className, ...props }) {
  return (
    <img
      {...props}
      className={`${className}`}
      src="/images/icon/app_icon.png"
    />
  );
}
