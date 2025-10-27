'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {
	const currentPath = usePathname()
	const { status, data: session } = useSession()
	const links = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/issues', label: 'Issues' },
	]
	return (
		<nav className="border-b mb-5 px-5 py-5 text-xl">
			<Container>
				<Flex justify="between">
					<Flex gap="3" align="center">
						<Link href={'/'}>
							<FaBug />
						</Link>
						<ul className="flex space-x-6">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										className={classNames({
											'text-zinc-200': currentPath === link.href,
											'text-zinc-500': currentPath !== link.href,
											'hover:text-zinc-300 transition-colors': true,
										})}
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>

					<Box>
						{status === 'authenticated' && (
							<Link href="/api/auth/signout">Log out</Link>
						)}
						{status === 'unauthenticated' && (
							<Link href="/api/auth/signin">Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	)
}

export default NavBar
