import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  devIndicators: false,
  turbopack: { root: __dirname }
}

export default config
