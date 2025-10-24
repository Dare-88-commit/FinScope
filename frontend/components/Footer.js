export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-10 py-6">
            <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} FinScope. All rights reserved.</p>
                <div className="flex gap-4 mt-2 sm:mt-0">
                    <a href="/privacy" className="hover:text-[#032D60] transition">
                        Privacy
                    </a>
                    <a href="/terms" className="hover:text-[#032D60] transition">
                        Terms
                    </a>
                    <a href="/help" className="hover:text-[#032D60] transition">
                        Help
                    </a>
                </div>
            </div>
        </footer>
    );
}
