import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div
      className="text-2xl"
      onClick={toggleTheme}
    >
      {theme == "light" && <FiSun />}
      {theme == "dark" && <FiMoon />}
    </div>
  );
};

export default ThemeChanger;
