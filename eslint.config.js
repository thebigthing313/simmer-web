// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  // Add a global ignores object at the top of the array
  {
    ignores: [
      'src/components/ui/**/*', // Ignore all files in the 'ui' directory
      'dist/*', // Ignore the entire 'dist' directory
      'build/*', // Ignore the entire 'build' directory
      '**/*.generated.*', // Ignore any file with `.generated.` in its name
      '**/legacy-code/**/*', // Ignore a specific subdirectory
      'src/db/supabase-types.ts', // Ignore supabase auto-generated types
    ],
  },
  ...tanstackConfig,
]
