import { AddEditProductForm } from '@/components/shared/addEditProductForm';

export function AddProductPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <AddEditProductForm mode="add" />
    </div>
  );
}
