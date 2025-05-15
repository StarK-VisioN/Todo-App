export default function ThemeBtn({ useTheme }) {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
        peer-checked:bg-blue-600
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white-600
        peer-checked:after:translate-x-5 peer-checked:after:border-white">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Theme</span>
    </label>
  );
}
