export type CardMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => Promise<void> | void;
};
