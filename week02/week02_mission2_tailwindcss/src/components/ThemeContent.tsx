import React, { ReactElement } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        I haven't heard from you in a couple of months But I'm out right now,
        and I'm all fucked up And you're callin' my phone, you're all alone And
        I'm sensin' some undertone And I'm right here with all my friends But
        you're sendin' me your new address And I know we're done, I know we're
        through But, God, when I look at you
      </p>
    </div>
  );
}
