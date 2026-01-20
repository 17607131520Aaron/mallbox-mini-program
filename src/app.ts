import { useLaunch } from "@tarojs/taro";

import type { PropsWithChildren } from "react";
import type React from "react";

import "./app.scss";

const App = ({
  children,
}: PropsWithChildren):
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | string
  | number
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | undefined
  | null
  | boolean => {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
};

export default App;
