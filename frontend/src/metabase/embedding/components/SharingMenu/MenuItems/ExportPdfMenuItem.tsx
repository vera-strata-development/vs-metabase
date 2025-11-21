import { useHasTokenFeature } from "metabase/common/hooks";
import { trackExportDashboardToPDF } from "metabase/dashboard/analytics";
import { DASHBOARD_PDF_EXPORT_ROOT_ID } from "metabase/dashboard/constants";
import { isWithinIframe } from "metabase/lib/dom";
import { useSelector } from "metabase/lib/redux";
import { Icon, Menu } from "metabase/ui";
import {
  getExportTabAsPdfButtonText,
  saveDashboardPdf,
} from "metabase/visualizations/lib/save-dashboard-pdf";
import type { Dashboard } from "metabase-types/api";

const handleClick = async (
  dashboard: Dashboard,
  includeBranding: boolean,
  state: any,
) => {
  const cardNodeSelector = `#${DASHBOARD_PDF_EXPORT_ROOT_ID}`;
  await saveDashboardPdf({
    selector: cardNodeSelector,
    dashboardName: dashboard.name,
    includeBranding,
    state,
  }).then(() => {
    trackExportDashboardToPDF({
      dashboardId: dashboard.id,
      dashboardAccessedVia: isWithinIframe()
        ? "interactive-iframe-embed"
        : "internal",
    });
  });
};

export const ExportPdfMenuItem = ({ dashboard }: { dashboard: Dashboard }) => {
  const isWhitelabeled = useHasTokenFeature("whitelabel");
  const includeBranding = !isWhitelabeled;
  const state = useSelector((state) => state);

  return (
    <Menu.Item
      data-testid="dashboard-export-pdf-button"
      leftSection={<Icon name="document" />}
      onClick={() => handleClick(dashboard, includeBranding, state)}
    >
      {getExportTabAsPdfButtonText(dashboard.tabs)}
    </Menu.Item>
  );
};
