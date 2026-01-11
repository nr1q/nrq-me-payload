import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import type { Work } from "@/payload-types";
import { revalidatePath } from "next/cache";

export const revalidateWork: CollectionAfterChangeHook<Work> = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/works/${doc.slug}`;

      payload.logger.info(`Revalidating work at path: ${path}`);

      revalidatePath(path);
      // revalidateTag('posts-sitemap')
    }
    // If the work was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const path = `/works/${previousDoc.slug}`

      payload.logger.info(`Revalidating old work at path: ${path}`);

      revalidatePath(path);
      // revalidateTag('posts-sitemap')
    }
  }
  return doc;
}

export const revalidateDelete: CollectionAfterDeleteHook<Work> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/works/${doc?.slug}`

    revalidatePath(path)
    // revalidateTag('posts-sitemap')
  }

  return doc
}
