import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LangProvider } from "./i18n/LangContext";
import { bouquets } from "./data/bouquets";
import type { Bouquet, OrderPayload } from "./types";
import { getTelegram } from "./lib/telegram";
import CatalogScreen from "./screens/CatalogScreen";
import DetailScreen from "./screens/DetailScreen";
import CartScreen from "./screens/CartScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

type Screen = "catalog" | "detail" | "cart" | "confirmation";

function AppShell() {
  const [screen, setScreen] = useState<Screen>("catalog");
  const [selected, setSelected] = useState<Bouquet | null>(null);
  const [order, setOrder] = useState<OrderPayload | null>(null);

  useEffect(() => {
    const tg = getTelegram();
    if (!tg) return;

    if (screen === "catalog") {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }

    const handleBack = () => {
      if (screen === "detail") setScreen("catalog");
      else if (screen === "cart") setScreen("detail");
      else if (screen === "confirmation") setScreen("catalog");
    };

    tg.BackButton.onClick(handleBack);
    return () => tg.BackButton.offClick(handleBack);
  }, [screen]);

  function openDetail(bouquet: Bouquet) {
    setSelected(bouquet);
    setScreen("detail");
  }

  function confirmOrder(payload: OrderPayload) {
    setOrder(payload);
    getTelegram()?.sendData(JSON.stringify(payload));
    setScreen("confirmation");
  }

  return (
    <div className="min-h-dvh bg-cream text-charcoal">
      <AnimatePresence mode="wait">
        {screen === "catalog" && <CatalogScreen key="catalog" bouquets={bouquets} onSelect={openDetail} />}
        {screen === "detail" && selected && (
          <DetailScreen key="detail" bouquet={selected} onChoose={() => setScreen("cart")} onBack={() => setScreen("catalog")} />
        )}
        {screen === "cart" && selected && (
          <CartScreen key="cart" bouquet={selected} onConfirm={confirmOrder} onBack={() => setScreen("detail")} />
        )}
        {screen === "confirmation" && order && (
          <ConfirmationScreen
            key="confirmation"
            order={order}
            onDone={() => getTelegram()?.close()}
            onBackToCatalog={() => setScreen("catalog")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}
