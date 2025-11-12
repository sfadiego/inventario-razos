import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { CarFront, EllipsisVertical } from 'lucide-react';
// Assume these icons are imported from an icon library
import { INavItem } from '@/interfaces/INavItem';
import { adminSidebarRoutes, mainSidebarRoutes } from '@/router/modules/sidebar.routes';
import { menuTypes } from '@/types/menuTypes';
import { AltArrowDown } from '@solar-icons/react';
import { useSidebar } from '../context/SidebarContext';
import { IOpenSubmenu } from './Sidebar/IOpenSubmenu';

const navItems: INavItem[] = mainSidebarRoutes;
const othersItems: INavItem[] = adminSidebarRoutes;

const AppSidebar: React.FC = () => {
  const { VITE_APP_FULL_TITLE } = import.meta.env;
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<IOpenSubmenu | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ['main', 'others'].forEach((menuType) => {
      const items = menuType === 'main' ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as menuTypes,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: menuTypes) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: INavItem[], menuType: menuTypes) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'
              } cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && (
                <AltArrowDown
                  className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index ? 'text-brand-500 rotate-180' : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}>
                <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : '0px',
              }}
            >
              <ul className="mt-2 ml-9 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                    >
                      {subItem.icon}
                      {subItem.name}
                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex py-8 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
        <Link className="" to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <div className="flex p-2">
                <div className="mr-2 flex-none dark:text-white">
                  <CarFront />
                </div>
                <div className="flex-1 dark:text-white">{VITE_APP_FULL_TITLE || 'SIN TITULO'}</div>
              </div>
            </>
          ) : (
            <CarFront className="dark:text-white" />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? 'Menu' : <EllipsisVertical className="size-6" />}
              </h2>
              {renderMenuItems(navItems, 'main')}
            </div>
            <div className="">
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? 'Admin' : <EllipsisVertical />}
              </h2>
              {renderMenuItems(othersItems, 'others')}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
