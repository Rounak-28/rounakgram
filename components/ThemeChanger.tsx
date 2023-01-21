import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div
      className="absolute right-36 top-[14px] text-2xl"
      onClick={toggleTheme}
    >
      {theme == "light" && <BsFillSunFill />}
      {theme == "dark" && <BsFillMoonFill />}
    </div>
  );
};

export default ThemeChanger;
