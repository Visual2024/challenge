import { Shadow } from "@/components/UI/shadow";

export function Footer() {
  return (
    <footer className="bg-black text-white p-4 shadow-md">
      <Shadow className="container mx-auto flex items-center justify-between">
        <p className="text-sm text-center w-full ">
          &copy; {new Date().getFullYear()} Derechos Reservados
        </p>
        <a
          href="https://github.com/danielduarte27"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-blue-500 transition"
        >
        </a>
      </Shadow>
    </footer>
  )
}