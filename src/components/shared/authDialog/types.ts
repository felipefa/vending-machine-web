export type FormType = 'login' | 'register' | null;

export type LoginFormProps = {
  closeForm: () => void;
};

export type RegisterFormProps = {
  closeForm: () => void;
};

export type UserRole = 'buyer' | 'seller';
