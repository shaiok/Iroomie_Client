"use client";

import React from "react";

// Type for Toast
interface Toast {
  id: string;
  open: boolean;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

// Constants
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// State and action types
interface ToastState {
  toasts: Toast[];
}

interface AddToastAction {
  type: typeof actionTypes.ADD_TOAST;
  toast: Toast;
}

interface UpdateToastAction {
  type: typeof actionTypes.UPDATE_TOAST;
  toast: Toast;
}

interface DismissToastAction {
  type: typeof actionTypes.DISMISS_TOAST;
  toastId?: string; // toastId might be undefined if dismissing all toasts
}

interface RemoveToastAction {
  type: typeof actionTypes.REMOVE_TOAST;
  toastId?: string; // toastId might be undefined if removing all toasts
}

// Union type for actions
type ToastAction =
  | AddToastAction
  | UpdateToastAction
  | DismissToastAction
  | RemoveToastAction;

let count = 0;

// Generate unique id for each toast
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Timeout map to manage toast removal
const toastTimeouts = new Map<string, NodeJS.Timeout>();

// Add toast to removal queue
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Reducer for managing toast state
export const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT), // Add toast to the list
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t // Update existing toast
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // Side effects for dismiss
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false } // Close the toast
            : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }; // Remove all toasts
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // Remove the specific toast
      };

    default:
      return state;
  }
};

// Listeners for state updates
const listeners: ((state: ToastState) => void)[] = [];

let memoryState: ToastState = { toasts: [] };

// Dispatch function to handle actions
function dispatch(action: ToastAction): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Toast function to add, update or dismiss a toast
interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

function toast(props: ToastProps) {
  const id = genId(); // Generate a unique ID for each toast

  // The update function is for updating an existing toast
  const update = (props: ToastProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: {
        ...props,
        id, // Ensure the ID is included
        open: false, // Mark as closed by default when updating
      },
    });

  // The dismiss function is to close a toast
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  // Add the toast with open status
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id, // Attach the ID
      open: true, // Mark as open by default
      onOpenChange: (open) => {
        if (!open) dismiss(); // Close toast if `open` is set to false
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

// useToast hook to manage toasts in component state
function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }), // Dismiss specific toast
  };
}

export { useToast, toast };