import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";

// Note: This component is for the shadcn/ui toast system
// The @core-erp/ui package uses sonner for toasts by default
// This component is kept for compatibility but may not be fully functional
export function Toaster() {
  // Simplified version - using sonner is recommended
  const toasts: any[] = []

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }: any) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
