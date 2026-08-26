import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("VelvetBloom crashed:", error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <span className="text-3xl">🌸</span>
          <p className="font-display text-lg text-charcoal">
            Щось пішло не так · Something went wrong · Что-то пошло не так
          </p>
          <button
            onClick={this.handleReload}
            className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-soft transition-transform active:scale-95"
          >
            Перезавантажити · Reload · Перезагрузить
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
