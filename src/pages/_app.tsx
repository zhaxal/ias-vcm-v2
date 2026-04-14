import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";

import { SidebarLayout } from "@/components/layout";
import type { SidebarNavItem } from "@/components/ui";

import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const homeNavItems: SidebarNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/warehouse", label: "Warehouse" },
];

type AppPage<P = Record<string, unknown>> = NextPage<P> & {
  hideSidebar?: boolean;
};

type AppPropsWithSidebarOptions = AppProps & {
  Component: AppPage;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithSidebarOptions) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const page = (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={1}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </QueryClientProvider>
  );

  if (Component.hideSidebar) {
    return page;
  }

  return (
    <SidebarLayout
      sidebar={{
        title: "IAS VCM",
        items: homeNavItems,
        activeHref: router.pathname,
      }}
    >
      {page}
    </SidebarLayout>
  );
}
