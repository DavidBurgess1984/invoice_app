import Header from "@/src/elements/header";
import InvoiceForm from "@/src/form/invoice-form";
import { useFlashMessage } from "@/src/providers/flash-message-provider";
import { useTheme } from "@/src/providers/theme-provider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  const { isThemeDark } = useTheme();

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {clearFlashMessage} = useFlashMessage()

  useEffect(() => {
      clearFlashMessage();
  }, [pathname, searchParams]); // Ensure this effect runs only once on component mount

  return (
    <html className={isThemeDark ? "dark" : undefined}>
      <body>
        <main className="w-full xl:px-[10%] mx-auto font-LeagueSpartan flex flex-col h-[100vh] overflow-auto">
          <InvoiceForm />
          <Header />
          <div className=" px-[1rem] md:px-[2rem] xl:px-0 flex-grow  mx-auto xl:pl-[5rem] w-full ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
