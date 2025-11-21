import { useEffect, useState } from "react";
import { t } from "ttag";

import type { EngineKey } from "metabase-types/api";

import { ENGINE_DOC_MAP } from "./constants";

export const useEngineDocMarkdownContent = (engineKey: EngineKey) => {
  const [markdownContent, setMarkdownContent] = useState<string>();
  const [loadingError, setLoadingError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const docFileName = ENGINE_DOC_MAP[engineKey];

    if (!docFileName) {
      setMarkdownContent(undefined);
      setLoadingError(t`Failed to load detailed documentation`);
      return;
    }

    setIsLoading(true);
    setLoadingError(undefined);

    // Temporarily disabled due to build issues with docs module resolution
    // import(`docs/databases/connections/${docFileName}.md`)
    //   .then((result: { default: string }) => {
    //     setMarkdownContent(result.default);
    //   })
    //   .catch((err) => {
    //     setMarkdownContent(undefined);
    //     setLoadingError(t`Failed to load detailed documentation`);
    //     console.error(
    //       "Failed to load documentation for engine:",
    //       engineKey,
    //       err,
    //     );
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    // Temporary workaround - disable engine docs
    setMarkdownContent(undefined);
    setLoadingError(t`Documentation temporarily unavailable`);
    setIsLoading(false);
  }, [engineKey]);

  return { markdownContent, loadingError, isLoading };
};
