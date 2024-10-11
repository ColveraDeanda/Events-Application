interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="text-center text-red-500">
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;