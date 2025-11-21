import { t } from "ttag";

import {
  AdminNavItem,
  type AdminNavItemProps,
  AdminNavWrapper,
} from "metabase/admin/components/AdminNav";
import { useHasTokenFeature } from "metabase/common/hooks";
import { useSelector } from "metabase/lib/redux";
import { getLocation } from "metabase/selectors/routing";
import { Divider, Stack } from "metabase/ui";

export function EmbeddingNav() {
  const hasSimpleEmbedding = useHasTokenFeature("embedding_simple");

  return (
    <AdminNavWrapper>
      <Stack gap="xs">
        {hasSimpleEmbedding && (
          <>
            <EmbeddingNavItem
              path="/admin/embedding/setup-guide"
              label={t`Setup guide`}
              icon="list"
            />

            <Divider mb="sm" />
          </>
        )}

        <EmbeddingNavItem
          path="/admin/embedding/modular"
          label={t`Modular`}
          icon="embed_modular"
        />

        <EmbeddingNavItem
          path="/admin/embedding/static"
          label={t`Static`}
          icon="embed_static"
        />
      </Stack>
    </AdminNavWrapper>
  );
}

const EmbeddingNavItem = (props: AdminNavItemProps) => {
  const location = useSelector(getLocation);
  const subpath = location?.pathname;

  const isActive = props.path === subpath;

  return <AdminNavItem {...props} active={isActive} />;
};
