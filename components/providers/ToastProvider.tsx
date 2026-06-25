'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 4000) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, message, variant, duration }]);
    },
    []
  );

  const success = useCallback((msg: string) => toast(msg, 'success'), [toast]);
  const error = useCallback((msg: string) => toast(msg, 'error', 5000), [toast]);
  const warning = useCallback((msg: string) => toast(msg, 'warning'), [toast]);
  const info = useCallback((msg: string) => toast(msg, 'info'), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// ─── Styles per variant ───────────────────────────────────────────────────────

const STYLES: Record<ToastVariant, { bar: string; icon: string; label: string }> = {
  success: {
    bar: 'bg-green-500',
    icon: '✓',
    label: 'border-green-200 bg-green-50 text-green-900',
  },
  error: {
    bar: 'bg-red-500',
    icon: '✕',
    label: 'border-red-200 bg-red-50 text-red-900',
  },
  warning: {
    bar: 'bg-amber-400',
    icon: '!',
    label: 'border-amber-200 bg-amber-50 text-amber-900',
  },
  info: {
    bar: 'bg-blue-500',
    icon: 'i',
    label: 'border-blue-200 bg-blue-50 text-blue-900',
  },
};

// ─── Individual Toast item ────────────────────────────────────────────────────

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: number) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const styles = STYLES[toast.variant];

  // Slide-in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onDismiss(toast.id), 350);
    }, toast.duration);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, onDismiss]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 350);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        transition: 'transform 350ms ease, opacity 350ms ease',
        transform: visible && !leaving ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible && !leaving ? 1 : 0,
      }}
      className={`relative flex items-start gap-3 w-full max-w-sm border rounded-xl shadow-lg px-4 py-3 overflow-hidden ${styles.label}`}
    >
      {/* Coloured left bar */}
      <span className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-xl ${styles.bar}`} />

      {/* Icon circle */}
      <span
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${styles.bar}`}
      >
        {styles.icon}
      </span>

      {/* Message */}
      <p className="flex-1 text-sm leading-relaxed font-medium">{toast.message}</p>

      {/* Close */}
      <button
        onClick={handleClose}
        className="shrink-0 text-current opacity-50 hover:opacity-100 text-lg leading-none"
        aria-label="بستن"
      >
        ×
      </button>
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    // RTL: bottom-right corner (visually bottom-left in LTR)
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto w-full sm:w-auto">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
