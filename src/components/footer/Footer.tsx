import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
    XLogoIcon,
    YoutubeLogoIcon
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-stone-200 border-t border-stone-300 w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 gap-4 max-w-7xl mx-auto">
        <div className="text-sm text-stone-800 font-semibold">
          © 2026 Livraria Online. Todos os direitos reservados.
        </div>
        <nav className="flex gap-4">
          <a
            className="text-stone-600 hover:text-blue-700 transition-all"
            href="#"
            title="Facebook"
            aria-label="Facebook"
          >
            <FacebookLogoIcon size={22} weight="fill" />
          </a>
          <a
            className="text-stone-600 hover:text-blue-700 transition-all"
            href="#"
            title="Instagram"
            aria-label="Instagram"
          >
            <InstagramLogoIcon size={22} weight="fill" />
          </a>
          <a
            className="text-stone-600 hover:text-blue-700 transition-all"
            href="#"
            title="Twitter"
            aria-label="Twitter"
          >
            <XLogoIcon size={22} weight="fill" />
          </a>
          <a
            className="text-stone-600 hover:text-blue-700 transition-all"
            href="#"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedinLogoIcon size={22} weight="fill" />
          </a>
          <a
            className="text-stone-600 hover:text-blue-700 transition-all"
            href="#"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <YoutubeLogoIcon size={22} weight="fill" />
          </a>
        </nav>
      </div>
    </footer>
  );
}