import React, { useEffect } from "react";
import { usePrevious } from "../../utils/hooks";

type ScrollUpProps = {
  location: any;
  children: React.ReactElement;
};

/** 滚动到顶部 */
const ScrollUp = (props: ScrollUpProps) => {
  const prevLocation = usePrevious(props.location);
  useEffect(() => {
    if (prevLocation && prevLocation.pathname !== props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [props.location, prevLocation]);
  return props.children;
};

export default ScrollUp;
