import Header from "@/src/elements/header";
import InvoiceForm from "@/src/form/invoice-form";
import { useTheme } from "@/src/providers/theme-provider";

export default function App({ children }: { children: React.ReactNode }) {
  const { isThemeDark } = useTheme();

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
