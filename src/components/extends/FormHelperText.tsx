interface FormHelperTextProps {
  children: React.ReactNode;
  error?: boolean;
}

const FormHelperText = ({ children, error = true }: FormHelperTextProps) => {
  return (
    <>
      <p className="text-red-600 text-xs">{children}</p>
    </>
  );
};

export default FormHelperText;
