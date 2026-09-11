"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class GridErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Grid Component Error Boundary Caught:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[460px] w-full rounded-xl border border-[#eae7df] bg-[#fbfaf7] p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <div className="p-3 bg-[#fcf0f0] text-[#982b2b] border border-[#f5c6c6] rounded-full">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#181716]">
              {this.props.fallbackTitle || "Grid Component Encountered an Error"}
            </h3>
            <p className="text-xs text-[#78756e] max-w-sm mt-1">
              {this.state.error?.message || "An unexpected error occurred while rendering the data grid."}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#181716] hover:bg-[#2c2a29] text-[#fbfaf7] text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Grid Component</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
