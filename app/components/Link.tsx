import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'

interface Props {
	href: string
	children: string
}

const Link = ({ href, children }: Props) => {
	return (
		<>
			{/* <NextLink href={href} paassHref legacyBehavior> */}
			<RadixLink asChild>
				<NextLink href={href}>{children}</NextLink>
			</RadixLink>
		</>
	)
}

export default Link
