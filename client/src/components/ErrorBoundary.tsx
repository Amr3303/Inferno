import React, { Component, ErrorInfo, ReactNode } from "react";
import { cleanupPusher } from "../lib/pusher";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error);
    console.error("Error info:", errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <button
            onClick={() => {
              cleanupPusher();
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
