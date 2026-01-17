'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'
import { CollectionSlug } from 'payload'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Post, Work } from '@/payload-types'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
  | Pick<Work, 'slug' | 'title' | 'content' | 'meta' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: CollectionSlug
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo}/${slug}`
  const content = doc && 'content' in doc
    ? doc?.content
    : {
      root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [],
      }
    }
  const image = (doc && 'heroImage' in doc) ? doc?.heroImage : undefined
  const categories = doc && 'categories' in doc ? doc?.categories : []
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!(metaImage || image) && <div className="">No image</div>}
        {!image && metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
        {image && typeof image !== 'string' && <Media resource={image} size="50vw" />}
      </div>
      <div className="py-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3 className="text-2xl mb-4">
              {relationTo === 'works' ? <>{titleToUse}</> : <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>}
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
        {content && <RichText className="p-0" data={content as DefaultTypedEditorState} />}
      </div>
    </article>
  )
}
