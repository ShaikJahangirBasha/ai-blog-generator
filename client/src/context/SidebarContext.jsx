import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SidebarContext = createContext(null);

const DESKTOP_WIDTH = 256;
const COLLAPSED_WIDTH = 80;
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function SidebarProvider({ children }) {
  const getScreenState = () => {
    const width = window.innerWidth;

    return {
      isMobile: width < MOBILE_BREAKPOINT,
      isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isDesktop: width >= TABLET_BREAKPOINT,
    };
  };

  const [screen, setScreen] = useState(getScreenState);

  const [collapsed, setCollapsed] = useState(
    window.innerWidth >= MOBILE_BREAKPOINT &&
      window.innerWidth < TABLET_BREAKPOINT
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const next = getScreenState();

      setScreen(next);

      if (next.isDesktop) {
        setCollapsed(false);
        setMobileOpen(false);
      }

      if (next.isTablet) {
        setCollapsed(true);
        setMobileOpen(false);
      }

      if (next.isMobile) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (screen.isMobile) {
      setMobileOpen((prev) => !prev);
      return;
    }

    setCollapsed((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const openMobileSidebar = () => {
    setMobileOpen(true);
  };

  const sidebarWidth = collapsed
    ? COLLAPSED_WIDTH
    : DESKTOP_WIDTH;

  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,

      isMobile: screen.isMobile,
      isTablet: screen.isTablet,
      isDesktop: screen.isDesktop,

      sidebarWidth,

      expandedWidth: DESKTOP_WIDTH,
      collapsedWidth: COLLAPSED_WIDTH,

      toggleSidebar,
      closeMobileSidebar,
      openMobileSidebar,
    }),
    [
      collapsed,
      mobileOpen,
      screen,
      sidebarWidth,
    ]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider."
    );
  }

  return context;
}