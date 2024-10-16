interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="text-center text-2xl mt-5">
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;