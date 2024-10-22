import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
              Team member
            </h2>
            <ul className="font-medium text-gray-500">
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  PO, CHAT, GROUP : 임청하
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  USER, SECURITY : 강은석
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  FE : 김주영
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  ACCOUNT, ADDRESS : 송지현
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
              paranmanzang-project
            </h2>
            <ul className="font-medium text-gray-500">
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  Licensing
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            All Rights © 2024 <Link href="/">paranmanzang</Link>.
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
            <Link
              href="https://github.com/paranmanzang/paran"
              className="text-gray-400 hover:text-gray-900"
            >
              <svg
                className="size-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
