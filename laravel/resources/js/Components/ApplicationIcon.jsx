export default function ApplicationIcon({ className, ...props }) {
  return (
    <>
      <img
        {...props}
        className={`${className}`}
        src="/images/icon/app_icon.png"
      />
      <style>
        {`
          .filter-shadow {
            filter: drop-shadow(0 0 16px black);
          }
        `}
      </style>
    </>
  );
}
