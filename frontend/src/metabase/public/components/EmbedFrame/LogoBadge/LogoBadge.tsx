import cx from "classnames";
import { t } from "ttag";

import ExternalLink from "metabase/common/components/ExternalLink";

import EmbedFrameS from "../EmbedFrame.module.css";

import LogoBadgeStyle from "./LogoBadge.module.css";
import VeraStrataLogo from "./verastrata_logo_with_text.svg?component";

export const LogoBadge = ({ dark }: { dark: boolean }) => {
  return (
    <ExternalLink
      className={cx(EmbedFrameS.LogoBadge, LogoBadgeStyle.metabaseLink, {
        [LogoBadgeStyle.dark]: dark,
        [LogoBadgeStyle.light]: !dark,
      })}
      href="https://www.verastrata.com"
      target="_blank"
    >
      <span>{t`Powered by`}</span>
      <VeraStrataLogo height={32} aria-label="Vera Strata" />
    </ExternalLink>
  );
};
