import type {ReactNode} from 'react'

// Studio also uses style components in the dropdown, passing only children there.
// Capture the style in the component rather than relying on an editor block prop.
export function createAlignedWritingStyle(
  style: 'normal' | 'h2' | 'h3',
  alignment: 'center' | 'right',
) {
  const Tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : 'p'

  return function AlignedWritingStyle({children}: {children?: ReactNode}) {
    return <Tag style={{textAlign: alignment}}>{children}</Tag>
  }
}
