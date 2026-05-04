import { Fragment, useState } from "react";
import { HeaderOne } from "@/components/header";
import Footer from "@/components/footer/footer";
import ScrollToTop from "@/components/scroll-to-top";
import FixedIconModal from "@/components/FixedIconModal";
import dynamic from "next/dynamic";

const Presentation = dynamic(() => import("@/components/presentation/Presentation"), { ssr: false });

const LayoutOne = ({ children, navPositionClass, topbar }) => {
  const [toggleClassName, SetToggleClassName] = useState(false);

  function toggleClassNameInBody() {
    SetToggleClassName((toggleClassName) => !toggleClassName);
  }

  return (
    <Fragment>
      <div
        className={`body-wrapper ${toggleClassName ? "ltn__utilize-open" : ""}`}
      >
        <HeaderOne
          toggleClassNameInBody={toggleClassNameInBody}
          SetToggleClassName={SetToggleClassName}
          navPositionClass={navPositionClass}
          topbar={topbar}
        />
        {children}
        <Footer />
        <ScrollToTop />
        <FixedIconModal>
          <Presentation />
        </FixedIconModal>
      </div>
    </Fragment>
  );
};

export default LayoutOne;
