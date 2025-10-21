import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://instarizz.com'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Note: Individual analyze steps, results, checkout, success, and analyzing pages
    // are intentionally excluded as they are dynamic/personalized user flows
    // and should not be indexed (robots: noindex set in their metadata)
  ]
}
