import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Dropdown } from '../ui/dropdown/Dropdown';

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }
    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400">
                <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                    <img src="/images/user/owner.jpg" alt="User" />
                </span>

                <span className="text-theme-sm mr-1 block font-medium">Musharof</span>
                {isOpen ? <ChevronDown width="18" height="20" /> : <ChevronUp width="18" height="20" />}
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800"
            >
                <div>
                    <span className="text-theme-sm block font-medium text-gray-700 dark:text-gray-400">Musharof Chowdhury</span>
                    <span className="text-theme-xs mt-0.5 block text-gray-500 dark:text-gray-400">randomuser@pimjo.com</span>
                </div>

                <Link
                    to="/signin"
                    className="group text-theme-sm mt-3 flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                    <LogOut width="24" height="24" />
                    Sign out
                </Link>
            </Dropdown>
        </div>
    );
}
