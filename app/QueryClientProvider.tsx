'use client'
import {
	QueryClient,
	QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

// Componente cliente que maneja la creación del QueryClient
function QueryProvider({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minuto
					},
				},
			})
	)
	return (
		<ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
	)
}

// Exporta el wrapper cliente
export default function QueryClientProvider({ children }: PropsWithChildren) {
	return <QueryProvider>{children}</QueryProvider>
}
