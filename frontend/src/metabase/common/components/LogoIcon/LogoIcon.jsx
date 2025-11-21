import cx from "classnames";
import PropTypes from "prop-types";
import { Component } from "react";

import CS from "metabase/css/core/index.css";
import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

export class DefaultLogoIcon extends Component {
  static defaultProps = {
    height: 48,
  };
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dark: PropTypes.bool,
    fill: PropTypes.string,
  };

  render() {
    const { dark, height, width } = this.props;
    const logoSrc = dark ? "/app/assets/img/logo-white.svg" : "/app/assets/img/logo.svg";
    // Logo is horizontal (aspect ratio ~1.4:1), so width should be ~1.4x height
    const calculatedWidth = width || (height * 1.4);
    return (
      <img
        className={cx(
          "Icon",
          { [CS.textMetabaseBrand]: !dark },
          { [CS.textWhite]: dark },
        )}
        src={logoSrc}
        width={calculatedWidth}
        height={height}
        alt="Vera Strata"
        data-testid="main-logo"
        style={{ objectFit: 'contain' }}
      />
    );
  }
}

export default function LogoIcon(props) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
