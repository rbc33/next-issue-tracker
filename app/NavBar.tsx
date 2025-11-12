'use client'
import Skeleton from '@/app/components/Skeleton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBug } from 'react-icons/fa'
import classNames from 'classnames'
import { useSession, signOut } from 'next-auth/react'
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from '@radix-ui/themes'

const NavBar = () => {
	return (
		<nav className="border-b mb-5 px-5 py-5 text-xl">
			<Container>
				<Flex justify="between">
					<Flex gap="3" align="center">
						<Link href={'/'}>
							<FaBug />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	)
}
const NavLinks = () => {
	const currentPath = usePathname()
	const links = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/issues', label: 'Issues' },
	]
	return (
		<ul className="flex space-x-6">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classNames({
							'nav-link': true,
							'text-zinc-200!': currentPath === link.href,
						})}
						href={link.href}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	)
}
const AuthStatus = () => {
	const { status, data: session } = useSession()
	const pathname = usePathname()

	if (status === 'loading') return <Skeleton width="3rem" />
	if (status === 'unauthenticated')
		return (
			<Link className="nav-link" href="/api/auth/signin">
				Login
			</Link>
		)

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button className="cursor-pointer">
						<Avatar
							src={session!.user!.image!}
							fallback="?"
							size="2"
							radius="full"
						/>
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item onClick={() => signOut({ callbackUrl: pathname })}>
						Log out
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	)
}

export default NavBar
