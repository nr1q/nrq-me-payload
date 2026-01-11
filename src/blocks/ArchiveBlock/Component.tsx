import type {
  ArchiveBlock as ArchiveBlockProps,
  Post,
  Work
} from '@/payload-types'

import React from 'react'
import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'

type ArchiveEntries = Post[] | Work[];

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs
  } = props

  const limit = limitFromProps || 3

  let entries: ArchiveEntries = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    if (relationTo === 'posts') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      })

      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
          : {}),
      })

      entries = fetchedPosts.docs
    } else if (relationTo === 'works') {
      const fetchedWorks = await payload.find({
        collection: 'works',
        depth: 1,
        limit,
        where: {
          _status: {
            equals: 'published'
          }
        }
      });
      entries = fetchedWorks.docs
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as ArchiveEntries

      entries = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive entries={entries} relationTo={relationTo as CollectionSlug} />
    </div>
  )
}
