const NavbarAdminSetting = () => {
  return (
    <div className="sticky top-0  bg-[#171C23] border-b border-gray-800 h-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline flex-col justify-center space-y-1 md:flex-row md:space-y-0 md:space-x-4">
                <h1 className="text-white text-lg font-bold">Settings</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className=" md:block">
              <div className="flex items-baseline space-x-4 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdminSetting;
