import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/property-dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Properties',
      path: '/property-details',
      icon: 'Building2',
    },
    {
      label: 'Financials',
      path: '/rent-collection',
      icon: 'DollarSign',
      submenu: [
        { label: 'Rent Collection', path: '/rent-collection' },
        { label: 'Expense Tracking', path: '/expense-tracking' },
        { label: 'Financial Reports', path: '/financial-reports' },
      ]
    },
    {
      label: 'Operations',
      path: '/tenant-management',
      icon: 'Users',
      submenu: [
        { label: 'Tenant Management', path: '/tenant-management' },
        { label: 'Maintenance Requests', path: '/maintenance-requests' },
      ]
    },
  ];

  const isActiveRoute = (path, submenu = null) => {
    if (submenu) {
      return submenu?.some(item => location?.pathname === item?.path);
    }
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/property-dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Building2" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">RentTracker</span>
            <span className="text-xs text-muted-foreground font-medium">Pro</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <Link
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActiveRoute(item?.path, item?.submenu)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
                {item?.submenu && (
                  <Icon name="ChevronDown" size={14} />
                )}
              </Link>

              {/* Dropdown Menu */}
              {item?.submenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-50">
                  <div className="py-1">
                    {item?.submenu?.map((subItem) => (
                      <Link
                        key={subItem?.path}
                        to={subItem?.path}
                        className={`block px-4 py-2 text-sm transition-smooth ${
                          location?.pathname === subItem?.path
                            ? 'bg-accent text-accent-foreground'
                            : 'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        {subItem?.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative group">
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} />
              </div>
              <span className="hidden lg:block text-sm font-medium">John Doe</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-50">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                  Account Preferences
                </a>
                <hr className="my-1 border-border" />
                <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                  Help & Support
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                  Sign Out
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <div key={item?.path}>
                <Link
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActiveRoute(item?.path, item?.submenu)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>

                {/* Mobile Submenu */}
                {item?.submenu && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item?.submenu?.map((subItem) => (
                      <Link
                        key={subItem?.path}
                        to={subItem?.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-smooth ${
                          location?.pathname === subItem?.path
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem?.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;