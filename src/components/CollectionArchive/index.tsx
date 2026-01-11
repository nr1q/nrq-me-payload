import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { CollectionSlug } from 'payload'

export type Props = {
  entries: CardPostData[],
  relationTo?: CollectionSlug,
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { entries, relationTo } = props

  // const publishedPosts = posts.filter
  // console.log(entries)

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {entries?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo={relationTo} title={result.title} showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
